---
title: "Keep code left"
subtitle: Best practice
abstract: >-
  Make code more readable.
date: 2026-01-02T00:10:00+01:00
---

This long wrapping in a if / else clause makes the code hard to read.

## Bad

```javascript
if (condition) {
  doWork();
} else {
  throw Error("Condition not met!");
}
```

## Good

```javascript
if (!condition) {
  throw Error("Condition not met!");
}
doWork();
```

## Stop nesting promises

[Another example](https://twitter.com/manekinekko/status/855824609299636230):

### Bad

```javascript
getData((a) => {
  getMoreData(a, (b) => {
    getMoreData(b, (c) => {
      getMoreData(c, (d) => {
        getMoreData(d, (e) => {
          console.log(e);
        });
      });
    });
  });
});
```

### Better

```javascript
getData()
  .then((a) => getMoreData(a))
  .then((b) => getMoreData(b))
  .then((c) => getMoreData(c))
  .then((d) => getMoreData(d))
  .then((e) => console.log(e));
```

### Even better

```javascript
const a = await getData();
const b = await getMoreData(a);
const c = await getMoreData(b);
const d = await getMoreData(c);
const e = await getMoreData(d);
console.log(e);
```
