---
title: Rebase and ideally Squash instead of Merge Pull Requests
subtitle: Best practice
abstract: >-
  A pull request should only address one change at a time.
date: 2026-01-02T00:10:00+01:00
---

You should rebase a branch against the main branch before "merging" it, so that
there is no merge commit.

While some
[consider rebasing to be an act of destroying the true history of a software project](https://medium.com/@fredrikmorken/why-you-should-stop-using-git-rebase-5552bee4fed1),
I think this is doing actually the opposite.

What matters in terms of history is that we preserve the time when a set of
changes became effective for the rest of the team. As long as a change is in an
isolated branch on which only one developer works on, it cannot produce bugs for
others (developers or users) thus it did not have the chance yet _to make
history_ so to speak.

By rebasing a PR against the main branch just before merging it will tell the
real story: the changes will appear in this branch in the order they became
_active_ and this accurately reflects the time when others were made aware of
these changes and also the time from when to entire codebase needed to deal with
the changes introduced by them.

## Squash merging

Once a PR is done and has been approved, I like to squash all commits into one
commit with a good and concise explanation. That one commit should ideally look
like the PR itself: a PR on GitHub has a title and a decription, which explains
the motivation for the change and lists what needs to be done (simple future).
Turning this into a commit means telling the story of what the commit now does
(in present tense).

I consider squashing a PR into one commit to main an even better way to
contribute changes to the main branch. I often have man small commits in a PR,
which add tests, implement features, refactor. Having all these in the main
branch does not really help other developers to quickly get the high-level
summary of a change.

## Cleaning up your commits for a PR

This does not mean that all PRs should only have one commit (although
[they rarely should have many](https://github.com/coderbyheart/first-principles/issues/6))
it makes reviewing a PR easier if all the commits in a PR are condensed down to
a set of distinct commit messages, even if they get squashed when being merged
anyway. See this as an opportunity to describe to the reviewer _what_ you did
when implementing the change. It also enables a reviewer to view changes in a
bigger PR with a context specific to a commit.

### Re-tell the story of your PR

Creating a clean set of distinct commits in a PR requires that atomic commits
were made in the first place. It's a good habit while developing to _commit
early and commit often_: create many small commits, which you then later can
combine into bigger ones. A great helper to achieve this is using
[`git add -p`](https://gist.github.com/mattlewissf/9958704), which will go
through all current unstaged changes and let you decide which changed segment in
a file to stage. `git add -p` allows you to create multiple commits from a
situation where you have applied different changes while developing (a new
feature here, but also a bug fix, and maybe some formatting, or changes to the
CI configuration).

> Tip: when incorporating PR feedback into these commits,
> [`git-absorb`](https://github.com/tummychow/git-absorb#elevator-pitch) can
> help with that.

#### What if you have unrelated changes in the same commit

You might encounter a situation where you accidentally combined unrelated
changes in one commit. There is a way to split up these commits, but there is no
reverse version of squash, it has to be done manually. See the _Splitting a
commit_ section in the
[official Git documentation](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History).
Here again, when in rebase, `git add -p` is your friend.

## Resources

- https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History
- https://dev.to/maxwell_dev/the-git-rebase-introduction-i-wish-id-had
- https://gist.github.com/mattlewissf/9958704
