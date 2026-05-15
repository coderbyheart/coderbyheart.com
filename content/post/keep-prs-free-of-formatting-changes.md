---
title: PRs should never contain formatting changes
subtitle: Best practice
abstract: >-
  It's important to have an automated way of formatting source code to eliminate
  discussions around style and remove noise from diffs.
date: 2025-12-28T12:38+01:00
---

It's important to have an automated way of formatting source code to eliminate
discussions around style and remove noise from diffs.

# All code style guides must be enforceable by tools

The best way to handle it is to fix all fixable errors using
[lint-staged](https://github.com/okonet/lint-staged) and
[Prettier](https://prettier.io/). That way developers won't even notice. Good
IDEs are able to apply prettier style guides automatically even during editing.
