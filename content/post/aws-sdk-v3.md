---
subtitle: Cloud Native
title: Migrating to AWS SDK v3 for JavaScript
abstract:
  Notes on migrating Bifravst to the completely rewritten AWS SDK for
  JavaScript/TypeScript
date: 2021-01-05T16:00:00.000Z
---

![Lotom Hyttefeld in Oppdal](https://live.staticflickr.com/65535/50799019551_aa1996a4cc_o_d.jpg)

AWS recently
[announced the general availability](https://aws.amazon.com/blogs/developer/modular-aws-sdk-for-javascript-is-now-generally-available/)
of the
[version 3 of their SDK for JavaScript](https://github.com/aws/aws-sdk-js-v3).

The most notable changes are

- the switch to providing modular packages: this allows to reduce the overall
  size of the dependencies and makes bundling, for example for web applications,
  faster,
- first-class Promise support: the infamous `.promise()` is no more,
- first-class TypeScript support: the SDK has now been written in TypeScript, so
  the definitions (which are maintained in
  [DefinitlyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) for
  version 2 of the SDK) will not longer lag behind,
- a new middleware stack that improves debuggability,
- [the ability to abort pending requests](https://aws.amazon.com/blogs/developer/abortcontroller-in-modular-aws-sdk-for-javascript/)
  which is especially interesting for web applications.

In this blog post I will summarize my findings when migrating the AWS flavour of
[Bifravst](https://github.com/bifravst/) to version 3 of the AWS SDK.

## _Command_ is the new _method_

Instead of calling methods on the client instance directly, e.g.
`s3.putObject().promise()`, in v3 the client's `send()` method has to be called
with an instance of a _command_ for the operation:
`s3.send(new PutObjectCommand())`.

So the general pattern to migrate to v3 is:

```diff
- service.operation()
+ service.send(new OperationCommand({}))
```

This worked in without issues in most cases. The arguments for the command class
stay the same. Operations without arguments need to get passed an empty object
(`{}`).

### Constructing a client

Client instances are constructed as before using `new`.  
You always need to pass an object to the constructor, even if not providing any
configuration.

```typescript
const iot = new IoTClient({});
```

### Calling an operation

Operations are now called by _sending_ a _command_:

```typescript
const { things } = await iot.send(new ListThingsCommand({}));
```

Here, again, you always need to pass an object to the constructor of the
command, even if not providing any parameters to the operation.

### A complete example:

```diff
- import { Iot } from 'aws-sdk'
+ import {
+ 	IoTClient,
+ 	ListThingsCommand,
+ } from '@aws-sdk/client-iot'

- const iot = new Iot()
+ const iot = new IoTClient({})

- const { things } = await iot.listThings().promise()
+ const { things } = await iot.send(new ListThingsCommand({}))
```

### Updating imports

Instead of pulling the dependency from
[`aws-sdk`](https://www.npmjs.com/package/aws-sdk), find the needed client
package in the
[API reference for the v3 SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/),
in the case above we need the
[`@aws-sdk/client-iot`](https://www.npmjs.com/package/@aws-sdk/client-iot).

> _Note:_ `IoT` now has a capital `T` at the end.

The `IotData` client from v2 is now located in
[`@aws-sdk/client-iot-data-plane`](https://www.npmjs.com/package/@aws-sdk/client-iot-data-plane)
and called `IoTDataPlaneClient`.

## Not in v3: StepFunctions

The StepFunctions client has not been ported to v3 because the service
[does not support CORS](https://github.com/aws/aws-sdk-js-v3/issues/1162),
because browsers cannot interact with it.

## S3

### createPresignedPost

S3.createPresignedPost() is now in `@aws-sdk/s3-presigned-post`

```diff
- import { S3 } from 'aws-sdk'
+ import { S3Client } from '@aws-sdk/client-s3'
+ import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
+ import { CreateJobCommand, IoTClient } from '@aws-sdk/client-iot'

- const s3 = new S3()
+ const s3 = new S3Client({})

- const { url, fields } = s3.createPresignedPost({
-   Bucket: bucketName,
-   Fields: {
-     key: `${jobId}.json`,
-   },
- })
+ const { url, fields } = await createPresignedPost(s3, {
+   Bucket: bucketName,
+   Key: `${jobId}.json`,
+ })
```

> _Note:_ It was made async and the `Key` field needs to be at the top level.

### SignatureDoesNotMatch error when uploading a file

[There is currently a bug](https://github.com/aws/aws-sdk-js-v3/issues/1800)
when uploading a file with a custom content-type. The workaround is to
[add a custom middleware that removes the extra header](https://github.com/aws/aws-sdk-js-v3/issues/1800#issuecomment-749459712):

```javascript
s3.middlewareStack.add(
  (next) => async (args) => {
    delete args.request.headers["content-type"];
    return next(args);
  },
  { step: "build" }
);

await s3.putObject({
  Bucket: bucket,
  Key: key,
  Body: body,
  ContentType: contentType,
});
```

## Custom signed HTTP requests

In case you need to construct your own signed requests, the `AWS.Signers.V4`
have also been moved:

```diff
- import * as AWS from 'aws-sdk'
- import { Credentials, Endpoint, HttpRequest } from 'aws-sdk'
+ import { SignatureV4 } from '@aws-sdk/signature-v4'
+ import { Credentials, Endpoint } from '@aws-sdk/types'
+ import { HttpRequest } from '@aws-sdk/protocol-http'
+ import { parse } from 'url'
```

Credentials now longer have a class, but a type:

```diff
- const credentials = new Credentials(AccessKeyId, SecretKey, SessionToken)
+ const credentials: Credentials = {
+	  accessKeyId,
+	  secretAccessKey,
+	  sessionToken,
+ }
```

Also the `Endpoint` class has been removed, so some URL parsing is nedded.

```diff
-	const httpRequest = new HttpRequest(new Endpoint(endpoint), region)
+	const httpRequest = new HttpRequest(
+		((p: ReturnType<typeof parse>): Endpoint =>
+			({
+				...p,
+				port: p.port !== null ? parseInt(p.port, 10) : undefined,
+			} as Endpoint))(parse(endpoint)),
+	)
```

Finally a signer can be created:

```diff
-	const signer = new AWS.Signers.V4(httpRequest, 'appsync', true)
+	const signer = new SignatureV4(httpRequest, 'appsync', true)
```

## Removed types

Some types have been removed or better, replaced with their idiomatic TypeScript
equivalent.

For example in the Timestream client, previously there was a
`type Records = Record[]`, which now no longer exists:

```diff
- import { TimestreamWrite } from 'aws-sdk'
+ import { _Record } from '@aws-sdk/client-timestream-write'

-	return Records.filter(isNotNullOrUndefined) as TimestreamWrite.Records
+	return Records.filter(isNotNullOrUndefined) as _Record[]
```

This needs a little bit of digging through the TypeScript definitions to figure
out which types still exist and which need to be replaced.

---

The migration was relatively straight forward and because of the BDD tests in
the project this refactoring could be done without a hassle. I will keep
updating this post in case there are more noteworthy findings.
