---
title: "Method calls: favour argument bags over individual arguments"
subtitle: Best practice
abstract: >-
  Bad: myMethod(arg1, arg2, arg3); Good: myMethod({ arg1, arg2, arg3 });
date: 2025-12-28T12:38+01:00
---

**Bad**

```javascript
myMethod(arg1, arg2, arg3);
```

**Good**

```javascript
myMethod({ arg1, arg2, arg3 });
```

**Reasons**

- this removes the
  [Connascence of Position (CoP)](https://dzone.com/articles/about-connascence)
  because the order of arguments becomes irrelevant
- arguments to methods can easier be created programmatically

**Watch out for**

- removing support for currying
