---
title: Let LLMs write the code, let humans judge the result
subtitle: Lessons learned
abstract: >-
  LLMs are now good enough that human source code review has become the
  bottleneck. It slows development down, and it makes the code less robust than
  it could be. Reviewers don't disappear, though: they assess whether the
  solution is fit for the task.
date: 2026-10-03T12:00:00+02:00
tags:
  - softwarecraft
  - llms
---

LLMs are now good enough that human source code review has become the
bottleneck.

In [his latest video](https://youtu.be/2zLuYU_Ub_0),
[Mo Bitar](https://www.youtube.com/@atmoio) talks about his experience letting
[Opus 5.5](https://www.anthropic.com/claude) build a complicated feature:
real-time multi-user support for his app. A few months ago, this would not have
been possible with LLMs. Now the feature worked flawlessly after a few hours
without his intervention. For a classical engineering team, that would have
taken weeks, maybe months to ship.

<https://www.youtube.com/embed/2zLuYU_Ub_0>

## LLMs are adversarial towards their own conclusions

I see the same with Opus 5.5. It doesn't only write good feature code. More
importantly, it is really, really good at finding edge cases and everything that
can go wrong, because by now LLMs have been trained to be adversarial towards
their own conclusions in order to reduce the mistakes they are making (and will
keep making). And because of that, they spend much more time analyzing what
could go wrong than I would.

## Human review makes the code less robust

I work on projects with and without human reviewers, and I add similarly complex
features to both. Without a reviewer, I let the LLM build defensive code in
depth, and it detects and prevents more edge cases. With a reviewer, I often
find myself holding back from letting the LLM add more defensive code for
unlikely edge cases, because that code is often larger than the happy path, and
every line of it adds cognitive load for the human reviewer.

Human code reviews in the age of agentic development are putting the brakes on
development speed. And because the number of lines a human can review is
limited, they also make the code less robust than it could be.

## Review the result, not the code

While human source code reviews have become obsolete, it is still important to
review whether the implemented solution is fit for the task it aims to solve.
The time we would have spent reading lines of code, we can now spend trying out
the new feature. And we can use human creativity to find ways to improve it:
especially in frontend projects, I still find that the look and feel often
leaves much to be desired.

Mo makes the same point: a CEO doesn't review the work their employees are
doing. They measure the result against the bottom line.

Let the LLM write the code. Let humans judge the result.
