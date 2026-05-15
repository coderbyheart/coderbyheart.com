---
title: Do not change two different things in one Pull Request
subtitle: Best practice
abstract: >-
  A pull request should only address one change at a time.
date: 2026-01-02T00:10:00+01:00
---

A Pull Request should only address one change at a time.

Reviewers might not have an in-depth understanding of how things relate to each
other in a project so do not mix conceptually different changes in one PR.

Some examples of what not to do:

- fix a bug AND update all dependencies. If a bug fix requires a new dependency
  or an update to one, then only add this single dependency change.
- implement a new feature AND fix a small bug on an unrelated file. Those should
  be two PRs.
