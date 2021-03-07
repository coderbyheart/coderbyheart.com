---
subtitle: Cloud Native
title:
  Handling NPM v7's unnecessary inclusion of peer dependencies with AWS SDK v3
abstract:
  When using NPM v7 to package lambdas using AWS SKD v3 it leads to unnecessary
  large deployment pacakges.
date: 2021-03-07T16:00:00.000Z
---

In my previous post [I looked into the new AWS SDK v3](./aws-sdk-v3), which
turned out to provide good improvements over version 2 that justify an upgrade.

The upgrade is relatively straight forward: the same type of change needs to be
applied to all clients and this can be done safely and quickly. Only a few
changes required more than simply replacing some API calls.

This week I decided to migrate a bigger codebase to NPM version 7, which is now
[general available](https://github.blog/2021-02-02-npm-7-is-now-generally-available/).
However this surfaced an issue in AWS SDK v3 that leads to lambdas becoming
unnecessary large, when the AWS SDK v3 clients are installed with NPM v7.

![MSC Preziosa polluting the air at Geirangerfjord](https://live.staticflickr.com/1840/42051140850_483af349da_o_d.jpg)

On a high level,
[the way I package lambdas](./how-i-package-typescript-lambdas-for-aws) runs
`npm ci --only=prod`, which with NPM v6 results in a `node_modules` folder for
this project I am working on of around 120 MB of dependencies. With NPM v7 on
the other hand I suddenly was seeing folder sizes of around 380 MB, which after
zipping was too large for AWS lambda:
[deployment packages after unzipping can only be 250 MB](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html).

When trying to deploy the solution this leads to CloudFormation errors like this
one:

> 7/88 | 5:33:19 PM | CREATE_FAILED | AWS::Lambda::LayerVersion |
> cat-tracker-Linux-fbfce639-layer (cattrackerLinuxfbfce639layerDD08A9A6)
> Unzipped size must be smaller than 262144000 bytes (Service:
> AWSLambdaInternal; Status Code: 400; Error Code:
> InvalidParameterValueException; Request ID:
> 839fc0c0-bc5e-4e4a-9cbb-df8fa8b2d3ba)

The issue has been reported in multiple variants
([#1536: Trim production dependencies](https://github.com/aws/aws-sdk-js-v3/issues/1536),
[#2051: middleware-retry includes react-native](https://github.com/aws/aws-sdk-js-v3/issues/2051))
on the AWS SDK v3 GitHub project, but a fix has not been released, yet.

After going a bit back and forth over different solutions, I managed to get the
lambda layer down to an acceptable size: 28.2 MB zipped / 196 MB unzipped size
for the main application lambda layer, which includes these dependencies:

```json
{
  "dependencies": {
    "@aws-sdk/client-apigatewayv2": "3.8.0",
    "@aws-sdk/client-cloudformation": "3.8.0",
    "@aws-sdk/client-cloudwatch-logs": "3.8.0",
    "@aws-sdk/client-codepipeline": "3.8.0",
    "@aws-sdk/client-dynamodb": "3.8.0",
    "@aws-sdk/client-iot": "3.8.0",
    "@aws-sdk/client-s3": "3.8.0",
    "@aws-sdk/client-sqs": "3.8.0",
    "@aws-sdk/client-ssm": "3.8.0",
    "@aws-sdk/client-sts": "3.8.0",
    "@aws-sdk/client-timestream-query": "3.8.0",
    "@aws-sdk/client-timestream-write": "3.8.0",
    "@nordicsemiconductor/cell-geolocation-helpers": "3.0.1",
    "@nordicsemiconductor/cloudformation-helpers": "6.0.9",
    "@nordicsemiconductor/e2e-bdd-test-runner": "12.1.8",
    "@nordicsemiconductor/random-words": "5.0.0",
    "@nordicsemiconductor/timestream-helpers": "3.1.1",
    "@sinclair/typebox": "0.12.9",
    "ajv": "7.1.1",
    "fp-ts": "2.9.5",
    "uuid": "8.3.2"
  }
}
```

The install command used here is

    npm i --ignore-scripts --only=prod --no-audit --legacy-peer-deps

`--ignore-scripts`, `--only=prod`, and `--no-audit` are expected for bundling
production dependencies.

The two important parameters to `npm` are:

1. `i` instead of [`ci`](https://docs.npmjs.com/cli/v7/commands/npm-ci):
   otherwise NPM v7 will, when used with the projects package-lock.json which
   contains many other development dependencies, install all dependencies, not
   just the production dependencies
2. `--legacy-peer-deps`: not many packages have yet migrated to NPM v7's new
   behaviour to
   [automatically resolve and install peerDependencies](https://github.blog/2021-02-02-npm-7-is-now-generally-available/#peer-dependencies).

For smaller projects without AWS SDK v3 dependencies you can keep using
`npm ci`,
[as the example in my lambda packager shows](https://github.com/NordicSemiconductor/cloud-aws-package-layered-lambdas-js/blob/abcb44867334cbbbd78297a9a8ab90638dcc47c4/cdk/prepareResources.ts#L39-L73),
which speeds up the installation process significantly.
