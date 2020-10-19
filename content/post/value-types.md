---
title: >-
  Value Types
subtitle: >-
  TypeScript
abstract: |
  *Value Types* are are used to enable _runtime validation_ of parameters. This provides a simple and expressive way to ensure their validity and convey their semantic meaning in code at the same time while making this transparent for the caller.
date: 2018-06-27T10:00+02:00
---

![Flowers](../media/value-types.jpg)

This technique is a variant of
[_Value Objects_](https://martinfowler.com/bliki/ValueObject.html) which I have
been using for many years, in different languages. The gist is that you create a
_boxed value_, which encapsulate business rules for a value, which cannot be
attribute to a primitive value, like a string.

Let's assume I have a class which allows sending of emails to a user:
`sendEmail(email, subject, text)`. All three parameters are strings:

```javascript
class Mailer {
  /**
   * @param string email
   * @param string subject
   * @param string text
   */
  public async sendEmail(email, subject, text) {
    // ...
  }
}
```

It's now very easy when programming against this method to construct a correct
invocation, with nevertheless invalid arguments:

```javascript
// email argument is not an email
m.sendEmail("John Doe", "Hello", "Text ...");
```

It is also easy to flip the order of the arguments, because they are all typed
as `string`:

```javascript
// email argument is not first
m.sendEmail("Hello", "Text ...", "john@example.com");
```

If we instead turn `email` into a value object, we can mitigate these kinds of
errors:

```javascript
class EmailValue {
  constructor(email) {
    if (!isValidEmail(email)) throw new TypeError("Not an email: " + email);
    this.email = email;
  }
}
```

Now the first example is no longer possible:

```javascript
// throws TypeError
m.sendEmail(new EmailValue("John Doe"), "Hello", "Text ...");
```

The second example has become less likely to happen, because it's easier to spot
in an IDE that the first argument is an `object`, not a string, and it is easier
in our implementation to detect wrong arguments. Value Objects also enable us to
have domain contracts about certain values _shapes_ in one central location and
not beeing replicated in all places, where we need to validate e.g. that an
argument looks like an email address.

```javascript
class Mailer {
  public async sendEmail(email, subject, text) {
    // Validate by shape, not by content using a regular expression
    if (!(email instanceof EmailValue))
      throw new TypeError('email must be EmailValue!');
    // ...
  }
}
```

## Safer, but harder to understand

Having built the fourth iteration of this technique in my projects, I recently
noticed one disadvantage: it increases the complexity of the calling code. Let's
compare the two examples.

Without value objects:

```javascript
const { Mailer } = require("@acme/mailer");

const m = new Mailer("localhost:25");
m.sendEmail("john@example.com", "Hello", "Text ...");
```

With value objects:

```javascript
const { Mailer, SmtpHostValue } = require("@acme/mailer");
// let's share global domain value objects!
const { EmailValue } = require("@acme/values");

const m = new Mailer(new SmtpHostValue("localhost", 25));
m.sendEmail(new EmailValue("john@example.com"), "Hello", "Text ...");
```

We now require the caller to construct the arguments first using the correct
value objects, before calling the actual method. This is well within the idea of
_failing fast_ but the problem here is that we move the knowledge about
parameters details to the outside world. The caller needs to know exactly which
Value Object class to import, and in case we need to refactor our implementation
we have increased our the code surface which might be affected by that.

We also increased the screen real-estate our code needs in order to get executed
which puts a toll on readability and comprehensibility. Especially for
developers who are not familiar with this concept constructs like this one seem
counter-intuitive:

```javascript
m.sendEmail(
  // "new" in an argument?
  new EmailValue("john@example.com")
);
```

Last but not least: _using_ instances of value objects becomes cumbersome.

Imaging the `sendEmail` method returns the email it has sent:

```javascript
class Mailer {
  public async sendEmail(email, subject, text) {
    // Validate by shape, not by content using a regular expression
    if (!(email instanceof EmailValue))
      throw new TypeError(
        `email must be EmailValue! "${JSON.stringify(email)}" given.`
      );
    // ...
    await this.transport.send(...);
    return {
      email, subject, text
    }
  }
}
```

For the caller `letter.email` is now an object:

```javascript
const letter = await m.sendEmail(
  new EmailValue("john@example.com"),
  "Hello",
  "Text ..."
);
typeof letter.email; // object(EmailValue)
```

In order to access the value they would need to either _know_ that an EmailValue
has a `email` property:

```javascript
letter.email.email; // 'john@example.com'
```

This is weird and leads to generalizing the `primitive` value through having
them implement a `.toString()` method:

```javascript
class EmailValue {
  // ...
  toString() {
    return this.email;
  }
}
```

so consumers of the value can stringify it:

```javascript
`${letter.email}`; // 'john@example.com'
```

_Unless_ the value object is no longer a string but e.g. a float, or composite
value which can no longer be usefully represented as a string:

```javascript
class SmtpHostValue {
  constructor(hostname, port) {
    this.hostname = hostname;
    this.port = port;
  }
}
```

Although one could intuitively tend to implement it like this:

```javascript
`${new SmtpHostValue("localhost", 25)}`; // 'localhost:25'
```

the problem here is that the string representation can not be used to construct
the value object:

```javascript
new EmailValue(`${new EmailValue("john@example.com")}`); // this works
new SmtpHostValue(`${new SmtpHostValue("localhost", 25)}`); // this doesn't
```

To be fair: in many cases you will simply be passing through value object
instances. But my experience showed that it gets especially tedious when
marshalling data to and from representation, e.g. when sending them via JSON or
receiving JSON input.

## Value Types: call me, like _you_ mean it

I was looking for an alternative way and what I wanted to achieve was to keep
the promises of Value Objects, but to reduce the overhead for the caller.

One design decision was to remove the need for the caller to know about Value
Objects, they should be able to call methods with primitive values ... we are
after all writing TypeScript code and I don't want to add additional bloat to
it. Also I wanted to address the boxed value problem: you should be able to
directly use the value instead of needing to _reach into the box_.

```javascript
class Mailer {
  public async sendEmail(
    email: string,
    subject: string,
    text: string
  ): Promise<Letter> {
      // ...
  }
}

type Letter = {
    email: string;
    subject: string;
    text: string;
}
```

I removed the boxing of values, but kept the semantics and shareable validation
of values through the introduction of _Value Types_ which are built on top of
[io-ts](https://github.com/gcanti/io-ts) which combines run-time validation and
TypeScript types.

This is how `sendEmail` is implemented:

```javascript
class Mailer {
  public async sendEmail(
    email: string,
    subject: string,
    text: string
  ): Promise<Letter> {
    email = validate(EmailValue)(email);
    await this.transport.send(...);
    return {
      email, subject, text
    }
  }
}
```

Let's look at the details:

```javascript
email = validate(EmailValue)(email);
```

`validate` is a method which is able to validate an argument against a given
Value Type. `EmailValue` is such a Value Type. `validate` will throw a TypeError
if an invalid argument is passed. For our method this means, we ensure that
`email` actually contain a string with a syntactically correct email address
according to our domain specs. We have also explicitly expressed the developers
intention: _email is a valid email address_. In case the caller passes an
invalid email address they will receive the TypeError.

It's important to note that `email` stays of type `String`, and also in the
returned letter, the caller can now access its properties naturally:

```javascript
const letter = await m.sendEmail("john@example.com", "Hello", "Text ...");
typeof letter.email; // 'john@example.com'
```

### Code

This is the implementation of `validate`:

```javascript
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';

/**
 * This function takes one of the value types to validate a parameter.
 *
 * Example:
 * const u = validate(URLValue)('https://example.com')
 * // typeof u === 'string'
 *
 * @link https://github.com/gcanti/io-ts
 * A: static (runtime) type
 * O: output of encode
 * I: output of decode
 * @throws TypeError
 */
export const validate = <A, O, I>(
  type: t.Type<A, O, I> | t.ArrayType<t.Type<A, O, I>, A, O, I>,
) => (value: I): A => {
  const result = type.decode(value);
  if (result.isLeft()) {
    throw new TypeError(PathReporter.report(result).join(''));
  }
  return result.value as A;
};
```

And the email value type is implemented like this:

```javascript
import * as t from 'io-ts';

const emailRegex = /.+\@.+\..+/;

export const EmailValue = new t.Type<string, string, string>(
  'Email',
  (s): s is string => typeof s === 'string',
  (m, c) => (m && emailRegex.test(m) ? t.success(m) : t.failure(m, c)),
  a => a,
);
```

## Summary

_Value Types_ are are used to enable _runtime validation_ of parameters. This
provides a simple and expressive way to ensure their validity and convey their
semantic meaning in code at the same time while making this transparent for the
caller.
