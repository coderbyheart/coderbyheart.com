---
title: >-
  TopConf Linz 2017 Notes
abstract: >-
  These are the notes I took for my company Slack during TopConf Linz 2017.
date: 2017-03-06T23:00+02:00
---

![Linz](../media/topconf-linz-2017.jpg)

For [the second time](//coderbyheart.com/topconf-linz-2016/) I visited the
TopConf in Linz, again as a speaker talking about
[the new skills required for technical leaders in network organizations](https://www.topconf.com/conference//linz-2017/talk/motivating-developers-with-purposeful-work/).
You can watch a periscope recording of the talk
[here](https://www.youtube.com/watch?v=ycE_1uwlE-M&t=2m59s), the slides are
[here](https://docs.google.com/presentation/d/1h9JkH7vF_w_s37DTu4iMImKvHxZletoKDoniTe1r4cI/edit?usp=sharing).

During the conference, I took some notes about the things I found interesting in
our tech Slack channel. Some of you might find these interesting, so here you
go:

## Day 1

[The keynote](https://www.topconf.com/conference//linz-2017/talk/opening-keynote-load-shedding-approaches-principles-experiences-and-impact-in-service-management/)
from a Google Infrastructure Expert was interesting, but their problems are
special. Good thing that we can source this problem out to AWS ;-)

Next one was the
[Intro to Elm](https://www.topconf.com/conference//linz-2017/talk/porting-prezi-to-elm-in-100-lines-of-code/).
[He](https://twitter.com/my_rho) built a Prezi clone
([Source](https://github.com/myrho/prezi-to-elm-in-99-loc),
[Slides](https://myrho.github.io/porting-prezi-to-elm-in-99-loc/?out.svg)) and
used that example to walk through most of the parts of elm-lang.org. It produces
JavaScript code without runtime errors but that requires you to define a
solution to the 100%. Which is tough for prototyping, but you will have code
that is easier to refactor in order to add new features. I think it might be a
good choice for features that are complete and to rebuild them in Elm to make
the even safer.

So, back from the
[Rust Talk](https://www.topconf.com/conference//linz-2017/talk/rust-for-serious-developers/)
(bad Wifi there). If you want to build server side micro service applications,
Rust is the way to go. It has a lot of advantages over Go and is now already
widely used at Mozilla. I think we don't need to go in that direction as long as
we don't have scaling issues. Running node code at AWS scales, but the price
will be way higher compared to the same service running as a native binary.

I knew [the book](http://www.sipgateblog.de/24-work-hacks/) but
[Corinna's](http://www.twitter.com/findingmarbles)
[talk](https://www.topconf.com/conference//linz-2017/talk/12-work-hacks/) was
very interesting and entertaining. Especially to learn how Sipgate does
Budgeting. They basically have no Budgets and no tight control, only through
transparency. Like Netflix: "Spend in the best interest of the company." Even
for education, they have no limit and it works out great for them.

[Cool presentation](https://www.topconf.com/conference//linz-2017/talk/beyond-projects-noprojects-why-projects-are-wrong-and-what-to-do-instead/)
on projects or the problems with them:
[#BeyondNoProjects](http://www.allankelly.net/static/presentations/Oredev2016/Oredev-BeyondNoProjects.pdf).

[Flowtype and The Wonders of Statically Typed JavaScript](https://www.topconf.com/conference//linz-2017/talk/flowtype-and-the-wonders-of-statically-typed-javascript/):
Because we have now Babel available everywhere, it might be a good time to look
again at flow. I mean, we barely have runtime errors. But compared to
[tcomb](https://github.com/gcanti/tcomb) it provides additional features like
automatic documentation and more sanity checks that can't be discovered by
tcomb. Because tcomb only works at runtime. So, a strategy could be: use tcomb
for runtime checks (e.g. at boundaries / public APIs, where you can't enforce
the calling code). And flow anywhere else. It's great that you can use flow
opt-in too and you can start small.

[The session on UX](https://www.topconf.com/conference//linz-2017/talk/ux-reports-from-the-trenches/)
was meh. Nothing interesing to report, besides: use PageSpeed.

Then I was in the Panel on Distributed Teams: you can watch it
[here](https://twitter.com/coderbyheart/status/836959108590944256) … my battery
died after 50mins, though. The panel starts at around 7:30mins.

## Day 2

[Keynote: Thirty months of microservices. Stairway to heaven or highway to hell? ](https://www.topconf.com/conference//linz-2017/talk/keynote-thirty-months-of-microservices-stairway-to-heaven-or-highway-to-hell/):
Nice: The [Zalando Tech](https://twitter.com/ZalandoTech)
[guidelines on building RESTful APIs](https://github.com/zalando/restful-api-guidelines/blob/master/README.md).

A book recommendation from
[#NoProjects talk](https://www.topconf.com/conference//linz-2017/talk/value-over-projects-a-noprojects-production/):
[The Principles of Product Development Flow](https://www.amazon.de/dp/1935401009/ref=cm_sw_r_tw_awdo_x_WU-TybMQ9R6QT).

The
[Skillful Sailor](https://www.topconf.com/conference//linz-2017/talk/a-smooth-sea-never-made-a-skillful-sailor/)
talk was pretty boring. A very simplified overview of how organizational change
works.

In the
[Frequent Releases & Major Changes](https://www.topconf.com/conference//linz-2017/talk/frequent-releases-major-changes/)
from [@mmozuras](https://twitter.com/mmozuras) he went through the basics of
continuous delivery and developing in parallel: feature flags, which enables
things like A/B tests.
