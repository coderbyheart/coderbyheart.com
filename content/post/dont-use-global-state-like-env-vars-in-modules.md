---
title: "Don't use global state like env variables in modules"
subtitle: Best practice
abstract: >-
  This hides dependencies to configuration values and makes them hard to spot.
date: 2025-12-28T12:38+01:00
---

Don't use global state like env variables in modules, only on the very top-level
or in one central location. Pass it in the constructor.

This hides dependencies to configuration values and makes them hard to spot.

## Bad

```javascript
class Foo {
  doSomething() {
    console.log(process.env.MY_ENV);
  }
}

new Foo().doSomething();
```

## Good

```javascript
class Foo {
  constructor(myEnv) {
    this.myEnv = myEnv;
  }
  doSomething() {
    console.log(this.myEnv);
  }
}

new Foo(process.env.MY_ENV).doSomething();
```
