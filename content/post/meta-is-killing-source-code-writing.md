---
title: Meta is killing source code writing, if you like it or not
subtitle:
  Facebook changed the way we build frontends, Meta changes the way we build
  software
abstract: >-
  Meta is investing billions into an LLM that writes software the Facebook way,
  and it has reassigned thousands of engineers to produce the training data for
  it. This paves the way to change how all of us build software, whether we like
  it or not.
date: 2026-07-12T23:00:00+02:00
---

![A pile of programming books on fire, flames consuming the pages](../media/burning-coding-books.png)

We are at an inflection point that will have a huge impact on how we write
software: Meta is investing billions of dollars into building an LLM that is
capable of writing software. They are doing this to write software _at
Facebook_—but as with React, what happens at Facebook does not stay at Facebook.

## Engineers as training data

In March 2026, Meta involuntarily transferred roughly 6,500 engineers and
product managers into a new unit called _Applied AI_ (internally: Agent Data
Optimization) whose job is to manufacture training data for Meta's models: hard
coding problems, the tests that check them, and grades on AI-written code.
According to
[The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/why-is-meta-destroying-its-engineering),
30–50% of engineers on core product teams were reassigned—people who were
building Instagram, ads, and infrastructure the week before.

Meta considers hand-written, novel coding problems from senior engineers so
valuable that it pulled thousands of them off product work to produce them. In
leaked audio,
[Zuckerberg reportedly argued](https://techcrunch.com/2026/06/12/metas-months-old-ai-unit-is-a-soul-crushing-gulag-say-the-engineers-stuck-inside-it/)
that Meta's own engineers are simply smarter than outside contractors—his case
for conscription over hiring.

These engineers are expected to deliver two such tasks per week—with a
[median software engineer compensation of $444,000](https://www.makerstations.io/meta-employee-statistics/)
these are some of the most expensive—and arguably best—engineers in the
industry.

## Aggressive pricing, by design

The second piece landed this week. On July 9, Meta released
[Muse Spark 1.1](https://www.bloomberg.com/news/articles/2026-07-09/meta-starts-charging-for-ai-with-muse-spark-1-1-agentic-model),
an agentic coding model, together with its first serious paid developer API:

> Since this is not an open source model, this is I think the first time that
> we're doing a real serious API. And the pricing is going to be very aggressive
> and attractive. —
> [_Mark Zuckerberg_, Bloomberg interview, 2026-07-09](https://www.bloomberg.com/news/articles/2026-07-09/meta-starts-charging-for-ai-with-muse-spark-1-1-agentic-model)

Developers can use the model for free up to a token threshold, and the API is
priced at roughly 25% of what OpenAI and Anthropic charge for their top models.
This is a deliberate land grab—and, I believe, an admission that there is no
money in selling access to LLMs in the long run. The race to the bottom of
frontier model pricing has already started—Meta's own launch at 25% of
competitor pricing _is_ that race, and cheap models from other labs are pushing
in the same direction. Zuckerberg himself calls the margins of the other labs
"very extreme"; his stated strategy is to get the technology in front of as many
people as possible. That is not the strategy of someone who plans to live off
token revenue. Meta's actual business is advertising, and its actual interest in
this model is writing Meta's own software cheaper and faster.

The paid API is just temporary—training models and running inference is
expensive today, but we have seen that for example Chinese companies are able to
produce coding models that can compete with the latest _Western_ models, having
only much more limited access to skills and hardware—training and inference
costs will eventually be low enough that Meta can afford to open source their
frontier coding model.

And running them will be feasible for anyone, not just a few frontier AI
companies with access to thousands of Nvidia GPUs.

Zuckerberg can afford to play this game for as long as he wants. He is the
shareholder with super-voting rights, which means he decides—by himself—where
Meta invests its money. He is on this track now, and he believes the future of
Meta is, in part, to reduce the amount of software written by humans at Meta.
Meta's internal targets say as much: the _Creation_ organization
[aims for 65% of engineers to produce more than 75% of their committed code with AI](https://newsletter.pragmaticengineer.com/p/why-is-meta-destroying-its-engineering)
in the first half of 2026.

Which puts the model in exactly the same position React was in: a tool built to
solve Facebook's problem, where giving it away costs Meta little and buys them
an ecosystem, mindshare, and a labor market pre-trained on their way of working.

## We have seen this movie: React

If you think "this is a Facebook-internal problem", let me remind you of
[React](https://react.dev/).

React was
[open-sourced at JSConf US in May 2013](<https://en.wikipedia.org/wiki/React_(software)>)
as a better way to build front-end applications. It solved a problem _for
Facebook_—and there are arguably very few companies in the world that have
Facebook-level problems with their frontend applications. Yet today React is the
predominant technology for building web applications; it has topped the
[Stack Overflow developer survey](https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies)
as the most-used web framework for years, in recent years by large margins.

To be fair: Meta has an enormous engineering organization. Of its roughly
[78,000 employees at the end of 2025](https://www.statista.com/statistics/273563/number-of-facebook-employees/),
about a third work in engineering—in the order of 25,000 engineers. React is
technically a great achievement. It is an innovation. It solves real problems.

But there were, and are, many good alternatives. React won in large part because
enough tech leaders were drinking the Facebook Kool-Aid: _what Facebook does
must be good, therefore it is good enough for us_. Add the job-market
flywheel—everybody who wants to work at a FAANG company learns React, so
everybody hires for React—and you get the de facto standard we all live with
today. An ecosystem that exists purely because Facebook willed it into
existence.

## Facebook changed the way we build frontends, Meta changes the way we build software

Now run the same playbook with an LLM instead of a UI library.

Meta makes the model cheap—25% of the competition—free to start with, and
eventually, I believe, open source. That is the React move: outsource the cost
of onboarding. Engineers learn the tool _before_ they apply at Meta, and arrive
with the skill Meta needs already available. Meanwhile Facebook is still the
biggest website on the planet, and what Meta does technically is still seen by
many as the epitome of scalable web application development.

So when Meta at some point says: _we no longer employ people who write source
code by hand—we employ software engineers, but they direct, review, and grade
code instead of writing it_ (and remember, at Facebook that code is written in
[Hack](https://hacklang.org/), their own PHP dialect
[introduced in 2014](https://engineering.fb.com/2014/03/20/developer-tools/hack-a-new-programming-language-for-hhvm/),
which tells you how comfortable they are with defining their own way of doing
things)—then a significant number of companies around the world will copy that
model. Not because it is the _best_ way to build software. React was not the
best way either. It will be a controversial way, and better alternatives will
continue to exist, including simply writing source code by hand.

But the Facebook way of developing software without writing source code will be
impossible to ignore for us as software crafters.

Given the trajectory Meta is on—the billions in investment, 6,500 engineers
producing training data, a coding model priced to undercut everyone and,
eventually, given away—this will lead to a significant shift in how we build
software.

React did not become the standard because it was the best option. It became the
standard because Facebook made it free, made it huge, and made it a hiring
requirement. The same machine is now being pointed at source code writing
itself.

If you like it or not.
