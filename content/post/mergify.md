---
subtitle: Tools
title: Interview with Mergify
abstract: I was interviewed by Mergify about my use of their service.
date: 2022-05-04T19:00:00.000Z
---

I was interviewed by Mergify about my use of their service.

> Opinions expressed are solely my own and do not express the views or opinions
> of my employer.

**Please could you explain a bit more about what Nordic Semiconductor does?**

Of course! As our name says, we are a semiconductor company, and a fabless one,
which means we earn our money by designing chips and selling them. To give you
an idea of the scale of our operation, we have sold about a billion Bluetooth
chips, selling around 1 million every day right now, and we are the world market
leader for Bluetooth connectivity. Products using our chips range from wireless
keyboards and mouses to tracking devices that you can put on your key chains. In
2018, we launched our long-range chip, which is a chip that connects directly to
cell phone networks using a new standard for IoT connectivity called
[LTE-M](https://en.wikipedia.org/wiki/LTE-M) or
[NB-IOT](https://en.wikipedia.org/wiki/Narrowband_IoT). We designed those chips
to use very little power to build a battery-operating device so small that you
can put it on a cat’s collar or a fitness tracker without needing to use a cell
phone as the gateway.

We currently have 1,200 employees worldwide, mostly in the northern hemisphere
and in Europe, but we are also in Singapore, China, and the US. Because things
that need tracking and real-time data are everywhere!

**What projects are you working on at Nordic Semiconductor?**

I’ve been working as a software engineer with a group responsible for figuring
out how the chips connect to the Internet and to cloud providers and teaching
our customers how chips work. Many of our customers are great at designing
hardware and physical products, but they often have very little experience in
cloud technologies. So we provide them with a comprehensive SDK \[software
development kit\] that shows not only how to build applications on the device
itself but explains how the device connects to AWS IoT and other IoT offerings,
how the data gets in there, and how the data gets out of there so that they can
focus on the product design.

**And that’s what your**
[**open-source projects**](https://github.com/NordicSemiconductor) **on GitHub
are all about, right?**

Yes, exactly. One closed-source software component is the driver for our modem
and contains our secret knowledge about how to deal with all these connectivity
protocols on the transport layer and how to implement encryption using the CPU.
But everything above that is open-sourced! Our SDK is an embedded one based on
[Zephyr](https://docs.zephyrproject.org/latest/getting_started/index.html), a
real-time open-source operating system \[OS\] part of the
[Linux Foundation](https://linuxfoundation.org/). Nordic Semiconductor provides
direct upstream features to Zephyr, but we maintain some of our application
samples and the stuff we do specifically for our hardware in a fork, as those
things are often not relevant to the entire ecosystem. We also open-sourced
samples for mobile apps to explain how to implement Bluetooth and use the
Bluetooth stack on your phone in the right way. In addition, we have a big
[open-source desktop application](https://github.com/NordicSemiconductor/pc-nrfconnect-launcher)
built using [Electron](https://www.electronjs.org/).

**What’s your typical GitHub workflow on those projects?**

It depends on the projects, so let’s talk about my preferred workflow, which is
based on [trunk-based development](https://trunkbaseddevelopment.com/).
Basically, the idea is that you don’t use feature branches—you put everything in
the main branch because otherwise, you would quickly end up with the problem
that you have too many parallel variances of your software. And when you start
merging a feature branch into your main branch, it will encounter merge
conflicts, and solving those conflicts calls for a lot of painful collaboration.
So ideally, I commit everything in small iterations to the main branch with very
short-lived feature branches—short-lived, meaning a few hours or a day.

However, we have some projects where I need reviewers. For example, there is
this documentation repository where tech writers are involved. In this case,
there are two workflows. If it is a purely technical change, like changing a
comment line argument in a document that was missing for the users, there is no
need for a tech writer to review it. But if I update or extend a document, there
will be a pull request \[PR\], and we have a rule that says at least three tech
writers need to approve it.

**Which projects do you use Mergify with?**

I use Mergify on a [TypeScript](https://www.typescriptlang.org/) project that I
started in 2019, intending to provide our customers with an open-source
reference implementation of end-to-end examples for an IoT product. That starts
with the firmware, but a lot of the code is the cloud component, showing our
customers that they need to get location data from the device to the cloud if
they want to build a cat tracker. For example, that they will need to visualize
it on a web application, what technologies should be used there, what AWS
services should be used there, or which database should be used there. I’ve made
this example open source, and I’ve done the same thing for Azure.

**How did you first hear about Mergify?**

Probably through Twitter. I have been doing dependency automation for quite a
long time. And previously, I was using [Greenkeeper](https://greenkeeper.io/),
but it was discontinued two years ago, so I had to find an alternative.

**How is Mergify helping you on this particular project?**

It saves me a lot of time with dependency updates, which means I can focus more
on the features. Dependencies change so often in the JavaScript ecosystem! So I
asked myself whether we should be pinning the dependencies and release every
half-year or quarter, or whether it was better to go with the flow.

I believe that projects are more manageable if you continuously maintain and
follow a path of stable release with your dependencies. And that’s where Mergify
has become extremely valuable to us!

**So you use Mergify to update your dependencies?**

Yes. So the main task Mergify does is if there is a dependency update created by
[Renovate bot](https://github.com/renovatebot/renovate) or the
[GitHub security bot](https://docs.github.com/en/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/configuring-dependabot-security-updates),
and all the tests pass on GitHub actions, it merges the PR. On my project,
[Mergify has merged hundreds and hundreds of PRs](https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js/pulls?q=is%3Apr+is%3Aclosed+label%3Amergify).
And with every PR taking a median of 2 minutes to be merged and more than a
hundred dependency update PRs happening every week, it saves me about 5 hours a
month! It also preserves the continuity of my coding sessions and removes some
irritating aspects of the work that would drive me mad. The only thing I have to
take care of is to make sure I have a well-tested codebase. This is a
precondition if you’re going to use Mergify—like, you need to make sure that you
have covered your dependencies in tests. Otherwise, you won’t know if they are
working.

**Do you differentiate between minor and major dependency updates?**

Absolutely. Major updates aren’t merged automatically. However, as they also
typically break the tests, I’m not bothered by that. But what often happens in
JavaScript is package maintainers bump up the minimum-required
[Node.js](https://nodejs.org/en/) version and declare it a breaking change, even
if there is no implementation change. So from a user perspective, that is a
change that wouldn’t break my system, but if I had been running tests without
the necessary Node.js version, they would have failed. So arguably, you could
even have merges for major version changes enabled automatically because, again,
if you have good test coverage, what can go wrong?

**What would be your N°1 tip for someone new to Mergify?**

The last time I checked Mergify documentation was maybe a year ago or earlier,
and I found it difficult to understand the possible combinations between the
available properties. It documents the properties pretty well, but it lacks
explanations for how to use Mergify on different types of projects. But I would
like to say that it’s worth investing some time in understanding how Mergify
works!

---

This interview was originally published
[on the Mergify blog](https://blog.mergify.com/they-use-mergify-nordic-semiconductor/).
