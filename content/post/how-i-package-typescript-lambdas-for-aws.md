---
title: >-
  How I package TypeScript lambdas for AWS
subtitle: >-
  Serverless
abstract: >-
  The latest (and greatest?) way I could come up to publish AWS Lambdas written
  in TypeScript.
date: 2019-04-25T17:00+02:00
---

![Used Spray Cans](../media/how-i-package-typescript-lambdas-for-aws.jpg)

[nRF Connect for Cloud](https://nrfcloud.com/) is an IoT product prototyping
platform built on top of AWS. It heavily uses serverless resources and all of
our business logic is deployed using AWS Lambda. Per last count there were over
100 lambdas which handle API requests, act based on MQTT messages, or run
maintenance operations.

While there are great solutions (like CloudFormation, or the even better
[CDK](https://github.com/awslabs/aws-cdk)) to manage _resources_ on AWS, when it
comes to publishing the program code for lambdas, the relevant documentation
section
[is rather sparse](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html).
This is understandable, though. AWS Lambda _only_ provides computation resources
(CPU, RAM) and does not care much how you use those resources in your code. It
makes actually very few assumptions about what you run and it supports
[any kind of language](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html).

This leaves a lot of room for _many possible ways_ to solve publishing code to
run on AWS Lambda. Since I joined the team in 2017 I went over multiple
iterations on how lambdas are deployed. In this article I want to describe the
latest way I could come up with and what it provides for our scenario.

## External dependencies in a layer

Our code depends on some rather big production dependencies. It needs to include
[`elasticsearch`](https://www.npmjs.com/package/elasticsearch) which adds a few
megabytes to the deployment package. In the past we used to pack lambdas with a
`package.json` per lambda to at least not have to include the Elasticsearch
client in lambdas that do not talk to this database. Nevertheless this resulted
in around 400MB in zipped deployment packages. It was reasonably fast (one
`npm ci --production` per lambda, and a `zip`), but deploying this amount of
data can take time on slower connections, which can be annoying during
development.

In the current approach I put all external dependencies for all lambdas in one
[Lambda Layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html).
This one ZIP file is a little bigger (25 MB) than the biggest individual lambda
deployment package before (18MB), _but_ I only need to publish this _once_.

## Tree-Shaking on inter-repo dependencies

For the individual lambda I use Webpack to compile it into a single module. I
[ignore all external modules](https://github.com/bifravst/package-layered-lambdas/blob/b8191d650a73d2eb208f4a90d46bb4e93db61782/src/packLambda.ts#L102)
so the deployment package only contains the code that is actually required from
the repository. The typical size of the zipped lambda now is around 15KB. This
results in huge savings in the total deployments size. Including the layer this
results in less than 30MB. Which is more than 10 times less.

## Deploy only if changed

It still takes time to build these deployment packages. That's why I use
[`dependency-tree`](https://www.npmjs.com/package/dependency-tree) to track the
dependencies of each lambda and only rebuild it if one of the dependencies has
changed. This brings a great improvement for the developer. Previously I used to
keep deployment packages locally and would manually remove those that needed to
be rebuild. This is error-prone and regularly led to forgetting a certain lambda
which was affected by the current edit. Since I now have a hash of all
dependency, I can tell exactly which lambda needs to be rebuild when a source
file is changed. Checking the dependencies is reasonably fast (a few seconds) so
I run it as part of our deployment command (hooked into `npx cdk`).

## Cache on S3

As an added bonus I publish all deployment packages on S3 (I need to do this for
CDK anyway). And the deployment script will skip the packaging of a lambda if
that exact version has already been build. This means a developer can check out
our repo and does not need to rebuild all lambdas in order to start working.

## Source code and usage in AWS CDK

I have published the source code of the deployment script
[here](https://github.com/bifravst/package-layered-lambdas). The entry method is
[`packLayeredLambdas`](https://github.com/bifravst/package-layered-lambdas/blob/saga/src/packLayeredLambdas.ts).

Since AWS CDK is building the Stack configuration through synchronously
constructing class instances we need to package the lambdas before we run
`new App()`.

### `cloudformation.ts`

```typescript
import * as fs from "fs";
import * as path from "path";
import { packBaseLayer } from "@bifravst/package-layered-lambdas";
import {
  packLayeredLambdas,
  WebpackMode,
} from "@bifravst/package-layered-lambdas";

(async () => {
  // This is where we locally store the packaged lambdas
  const outDir = path.resolve(__dirname, "pack");

  // Create the directory if it does not exist
  try {
    fs.statSync(outDir);
  } catch (_) {
    fs.mkdirSync(outDir);
  }

  // Set the name of the S3 bucket to store the lambdas
  // in reality we have another CDK App which provides this value,
  // but I have omitted it for the sakee of brevity
  const bucketName = "cf-sourcecode";

  // Location of the webpack config to use (see below)
  const webpackConfig = path.resolve(__dirname, "tsconfig-webpack.json");

  // Location of the tsConfig to use with dependency-tree (see below)
  const tsConfig = path.resolve(__dirname, "tsconfig-dependency-tree.json");

  // Now package your lambdas
  const layeredLambdas = await packLayeredLambdas<{
    helloWorld: string;
  }>({
    // We group related lambdas per feature, this identifies the group
    id: "my-project-lambdas",
    webpackConfig,
    mode: WebpackMode.production,
    srcDir: __dirname,
    outDir,
    Bucket: bucketName,
    lambdas: {
      helloWorld: path.resolve(__dirname, "hello-world.ts"),
    },
    tsConfig,
  });

  // And create the base layer
  const baseLayer = await packBaseLayer({
    srcDir: __dirname,
    outDir,
    Bucket: bucketName,
  });

  // Now you can construct your CDK app and pass the locations
  // of the layered lambdas and the base layer location in,
  // to use them when constructing a Lambda function definition
  new MyCDKApp(layeredLambdas, baseLayer).run();
})();
```

### `tsconfig-webpack.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "strict": true,
    "declaration": false,
    "skipLibCheck": true,
    "noUnusedParameters": true,
    "noUnusedLocals": true
  },
  "include": ["**/*.ts"]
}
```

### `tsconfig-dependency-tree.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "lib": ["es2017"],
    "strict": true,
    "outDir": "dist/",
    "declaration": false,
    "skipLibCheck": true,
    "noUnusedParameters": true,
    "noUnusedLocals": true
  },
  "include": ["**/*.ts"]
}
```

If you would like to see a working example with AWS CDK,
[ping me](https://twitter.com/coderbyheart) or leave a comment below. As always,
I'd love to get your feedback on how _you_ solve this in your project, too!
