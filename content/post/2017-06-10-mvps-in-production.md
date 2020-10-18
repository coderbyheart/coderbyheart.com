---
title: >-
  MVPs in Production
subtitle: >-
  Reflections on being a CTO for 5 years
abstract: |
  In this post series I'll reflect on the technical principles that I've employed in the last 5 years working as a CTO to achieve something that would have been seen as futile and insane a decade ago, but is the norm today: running software in production that is neither complete nor well-designed and needs to evolve every day.
date: 2017-06-10
---

![Driving on the Autobahn at Night](../media/2017-06-10-mvps-in-production.jpg)

From 2013 to 2017 I've worked as a CTO in four startups:
[DeinBus](https://www.deinbus.de/), [dotHIV](https://click4life.hiv/),
[Fintura](https://fintura.de/), and
[Resourceful Humans](https://resourceful-humans.com/). In all I was not a
technical co-founder but joined the team at a time when the existing technology
showed cracks that put the business at risk. The notorious shortage of tech
talent made these startups turn to freelancers, agencies to build their first
public beta or despite lacking a professional technical background the founders
started to build the solution on their own. Which is actually the smartest thing
you can do, because in the pre-seed phase of a startup cash is usually a very
scarce resources and freelancers and agencies are charging rates which are not
affordable on a sustainable rate, but will lead to cutting (cost) corners that
create technical debt that is not transparent to the startup, which leads to
even more risks.

Once I joined these teams my job in all cases was to stabilize the technology
and make it more robust and reliable, and increase the headcount of the tech
team to improve _velocity_, which is the speed at which you can release new
features to your (sometimes paying) users. In a start-up environment, where
there are only known and unknown unknowns achiving these goals is especially
challenging. In this blog series I'll explain the principles that I've employed
which enable notoriously understaffed tech teams to tackle these challenges at a
sustainable pace.

This is a recollection of how I made it work, and of course, so many things
could have been done better, if the circumstances had been different. The
opinions expressed in these posts are solely my personal views and not those of
my former employers.

I'll try to put this into an easy to read guide for future CTOs,
[follow me on Twitter](https://twitter.com/coderbyheart) to know first, when
I'll finish a new section.

Before you start reading here is some context: all these startups were product
startups building web-based (an mobile) applications, which were development
in-house as well as using service providers and freelancers. We hosted them on
bare-metal, virtual serves or on AWS. The team size was never more then 15
people, always in a distributed setting, where working remotely was the norm.

The first post is already finished:

- [Setting up a product management process](/setting-up-a-product-management-process/)

Coming up next:

- Building an architecture that supports feature creep, Building features in
  verticals

---

I'll also want cover these topics in later installements of this series:

- Going serverless
- Push to deploy and Code Stewardship
- Running experiments in production, without staging
- The case for JavaScript
- Test-driven development
- Designing RESTful APIs that evolve easily
- Using Bots and open-source to fight Conway's law

**But here is the catch:** I want 10 additional readers to sign up for my
influencer group for this series before I start the third section, and you'll
get to pick which one I'll continue with!

[Fill out this form if you are interested to read more!](https://coderbyheart.typeform.com/to/wxURIj)
