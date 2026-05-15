---
title: Clean .gitignore files
subtitle: Best practice
abstract: >-
  A .gitignore in a project should only cover artifacts caused by the contained
  source code, not those caused by the personal choice of editor and/or
  environment of a developer.
date: 2025-12-28T12:38+01:00
---

A `.gitignore` in a project should only cover artifacts caused by the contained
source code, not those caused by the personal choice of editor and/or
environment of a developer. Use
[a global git ignore file](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files#configuring-ignored-files-for-all-repositories-on-your-computer)
for that.

Yes, you can solve it also with a well maintained `.gitignore` file that covers
everything in all projects but this can get
[quite extensive to cover all cases](https://github.com/github/gitignore).

I consider it noise if entries are in the `.gitignore` that have no relation to
the specific project: I want a **clean** `.gitignore` file.

Maintaining a global `.gitignore` file for _your personal setup_ also has the
advantage that it affects all existing and future projects on your machine, thus
eliminating the possibility of accidentally committing those files. Otherwise
you would need to remember to add your IDE files to EVERY projects `.gitignore`.

Additionally, changes to the `.gitignore` of a project are not free: they
trigger CI runs, releases, reviews. Having people constantly add their favourite
rules creates noise. I don't want that.

Having a huge catch-all `.gitignore` is no solution either, it will only cover
known files. Additions trigger noise.

Adding files to a git repository is a deliberate action, if developers add files
that do not belong to a feature or change they need to be better educated about
it. If this is done, an accident-preventing-gitignore is no longer needed.

## Good example

```
dist/
node_modules/
```

## Bad example

```
.idea
.vscode
.DS_Store
```

## Tip

[Have a local folder to put your crap in which won't get accidentally committed](https://coderbyheart.com/have-a-local-folder-to-put-your-crap-in-which-wont-get-accidentally-committed/)
