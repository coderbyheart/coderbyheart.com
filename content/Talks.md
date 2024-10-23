---
title: Talks
subtitle: A list of my talks
---

I am available for speaking engagements! Just contact me if you feel I can
contribute to your event or conference.

## Upcoming: Strongly typed third-party integrations with TypeScript

> Many of us have to integrate third-party APIs, and we cannot trust their
> documentation. We also need to track when their data format changes. The same
> is true for integrating our own (or other teams’) microservices. I will show
> how we do this in an effective and flexible way using TypeScript.

In this talk, I will present my approach to doing this safely with TypeScript
and how this enables end-to-end contract testing which I have been using for
many years and consider one of the robust best practices we apply basically in
all of our web application projects.

This is a very practical, hands-on talk with many concrete examples that will
give the audience a clear guide on how to build robust, well documented system
integrations.

We leverage NPM modules to version our API definition and create a clear source
of truth for all your integrations, be it a REST API, WebSocket or CoAP
messages-the same principle applies.

The three key-takeaways are:

- learn about [TypeBox](https://github.com/sinclairzx81/typebox) and how I use
  it to make integrations of third-party APIs type-safe
- see a code-example where a frontend-application runs against a mock-API using
  these types
- get to know techniques to discover breaking API changes through monitoring

🇳🇴 [Bart.js](https://www.meetup.com/bartjs/), (Trondheim, Norway) 📅 20.
November 2024

## Software Quality made this talk happen: push-to-deploy as the means to deal with uncertainty

[Video](https://www.youtube.com/watch?v=2KeBxWAdndo) ·
[Blog post](./push-to-deploy-as-the-means-to-deal-with-uncertainty) ·
[Slides](https://drive.google.com/file/d/1ZrrTc4YdN0C23C1GOXilOaD4eCfsplYO/view?usp=sharing)

This talk is an encouragement for developers to trust their skills and tools,
but also invest in mastering them.

### The three main takeaways are:

1. Prioritize writing good quality software that rarely breaks. This allows for
   better work-life balance and frees up time for self-development and community
   initiatives.
1. Utilize Test-Driven Development (TDD) with a focus on outside-in testing.
   This builds confidence in code changes and keeps the focus on delivering
   value to the user.
1. Focus on user stories when building products. This ensures collaboration with
   all stakeholders and fosters a successful software development process.

🇫🇷 [NewCrafts](https://ncrafts.io/speaker/markustacker) (Paris, Germany) 📅 16.
May 2024

## Exploring better ways to write tests

Video: [Updated version](https://vimeo.com/showcase/10739959/video/887919689),
[First version](https://www.youtube.com/watch?v=dZX7SbGOGn4) ·
[Blog post](./exploring-better-ways-to-write-tests) ·
[Slides](https://bit.ly/better-test-tools)

Very often we focus on improving the way we write tests within our test
frameworks. I on the other hand invest time into building new test frameworks.
Over the last years I have worked on
[end-to-end testing cloud native applications](#it-does-not-run-on-my-machine-integration-testing-a-cloud-native-application),
which lead to the development of a BDD feature runner. This year I took the idea
even further with a focus on coming closer to the goal of living documentation:
the test files are now written in Markdown. In addition I started to work on
fixing another big issue that we encounter often:
[our inability to provide good architecture documentation](/twitter/status/1381512195612246018)
... what we need is not big, huge architecture diagrams for entire systems (like
we get when we use C4, Arc42), but diagrams that are context-sensitive. BDD is
actually a great source for these kinds of diagrams and this is what I want to
share in this talk.

### Key take-aways

- that testing, developing and documentation go hand in hand
- that we as people working on these system need to look at our tools and find
  ways to improve them
- ideas on how to build living, understandable, up-date architecture diagrams
- new ideas about the features of GitHub Actions, traceability and automated
  diagram generation

🇪🇪 [Nordic Testing Day 2023](https://nordictestingdays.eu/) (Tallin, Estonia) 📅
7-9. Juni 2023  
🇳🇴
[Trondheim Developer Conference 2023](https://2023.trondheimdc.no/speakers/markus-tacker/)
(Trondheim, Norway) 📅 23. October 2023

## Firmware test automation using real embedded devices

[Blog post](./firmware-test-automation-using-real-embedded-devices) ·
[Slides](https://bit.ly/fwtesting)

In this talk I am presenting my approach on testing embedded firmware using real
hardware.

Testing firmware in emulators drastically limits what actually gets tested and
it can quickly become very tedious to mock, fake and set up environments for
embedded firmware that needs to connect to cloud services.

I am taking a different route: let the firmware run on real hardware, and test
its behavior.

I show how I implemented these tests using Zephyr, AWS, and GitHub Actions.
However, this solution can be applied in any environment which cannot be run
inside a test runner.

🇪🇪 [Nordic Testing Day 2022](./ntd2022) (Tallin, Estonia) 📅 3. Juni 2022

## I am a coder, help me learn to collaborate!

[Video](https://vimeo.com/691826440) ·
[Blog post](./i-am-a-coder-help-me-learn-to-collaborate) ·
[Twitter Thread](https://twitter.com/coderbyheart/status/1119970835014529024)

This talk is a wake up call and should inspire other developers like me, to
start looking into improving their communication and collaboration skills. I
want to show the fallacy of aiming to be a fantastic coder and provide concrete
examples and resources on how to start.

🇳🇴
[BoosterConf 2022](https://2022.boosterconf.no/talk/2-using-communication-frameworks-to-become-a-better-engineering-leader/)
(Bergen, Norway) 📅 24. March 2022

## Serverless Architecture for IoT on AWS

Slides: [Interactive](https://bit.ly/awsiotarch) ·
[Video](https://youtu.be/E7t6BXGIZHk)

Let's have a look how a temperature reading travels an IoT solution on AWS and
Azure from the device to the web application.

This is a talk that explains the benefits of serverless in general in why it is
especially suitable for IoT applications. It also shows a concrete, open-source
example.

It will provide an introduction to serverless in general, and how it is
implemented at the different cloud vendors (looking at AWS and Azure, where I
have implemented the same application using the respective cloud's idiomatic
way), and why it is especially relevant for IoT deployments.

🇳🇴
[Høyskolen Kristiania, TEK303, Machine-to-Machine Communication](https://www.kristiania.no/en/syllabus/school-of-economics-innovation-and-technology/first-cycle-degree/tek303/machine-to-machine-communication/),
(Oslo, Norway) Guest lecture 📅 9. November 2021  
🌐
[NTNU, IDG2001, Cloud Technologies](https://www.ntnu.edu/studies/courses/IDG2001),
Online guest lecture 📅 23. February 2022  
🌐
[NTNU, PROG2005, Cloud Technologies](https://www.ntnu.edu/studies/courses/PROG2005),
Online guest lecture 📅 30. March 2022  
🇳🇴
[AWS UserGroup](https://www.meetup.com/AWS-User-Group-Trondheim/events/283260963/)
(Trondheim, Norway) 📅 30. March 2022

## Cloud connectivity and protocols for the Internet of Things

[Blog post](/cloud-connectivity-and-protocols-for-the-internet-of-things) ·
Slides:
[PDF](https://devzone.nordicsemi.com/cfs-file/__key/support-attachments/beef5d1b77644c448dabff31668f3a47-cfd384f9b1874d3caf1df02c9677eca4/2870.PowerPoint.Slides.with.Notes.pdf),
[Interactive](https://coderbyheart.github.io/nordicwebinar2020/index.html) ·
[Video](https://www.youtube.com/watch?v=pNaBB_OFbgg)

This is a webinar I did for
[Nordic Semiconductor Tech Webinars](https://www.nordicsemi.com/Events/Webinars)
together with my colleague Carl Richard Fosse, but it applies to everyone who
wants to get an introduction to protocols to consider when developing a cellular
IoT product.

It provides an overview over the important factors that need to be considered
when it comes to picking the right solution for sending your products' data to
the cloud.

🌐
[Nordic Tech Webinar](https://webinars.nordicsemi.com/cloud-connectivity-and-protocols-5)
(Online) 📅 21. October 2020

## It does not run on my machine: Integration testing a cloud-native application

[Blog post](/it-does-not-run-on-my-machine) ·
[Slides](https://docs.google.com/presentation/d/1Vlzwqw0siIK-2IL0MjahFUvnuHFDf9NqFQr95mG_tEI/edit?usp=sharing)
· [Video](https://youtu.be/yt7oJ-To4kI)

In this talk I will take you through the challenge of testing a cloud-native
application. I will cover the challenges when developing solutions on top of
serverless components which you cannot run on your own machine and how I
designed a BDD driven approach to run the integration tests.

🇩🇪 [SoCraTes Conference 2018](https://www.socrates-conference.de/) (Soltau,
Germany) 📅 31. August 2018  
🇫🇮 [Codefreeze 2019](https://codefreeze.fi/) (Kiilopää, Finland) 📅 9. January
2019  
🇪🇸
[Euro Testing Conference 2019](https://europeantestingconference.eu/2019/topics/#markus-tacker)
(Valencia, Spain) 📅 14-15. February 2019  
🇸🇪 [Øredev 2019](http://oredev.org/) (Malmö, Sweden) 📅 November 2019  
🇳🇴
[AWS UserGroup](https://www.meetup.com/de-DE/AWS-User-Group-Trondheim/events/265747804/)
(Trondheim, Norway) 📅 November 2019  
🇸🇪 [AWS Community Days Nordics](https://awscommunitynordics.org/communityday/)
(Stockholm, Sweden) 📅 January 2020

## About: Call for Papers

[Blog post](/call-for-proposals-lightning-talk) ·
[Slides](https://docs.google.com/presentation/d/1Jmsf7aU2saJBzrWMCFrtxfiofWOSvS62BKKMRLDhb_Q/edit?usp=sharing)
· [Video](https://www.youtube.com/watch?v=jzqCzGXT7hw)

Lightning talk about how conference call for papers work.

🇩🇪 [Global Diversity CFP Day](https://www.globaldiversitycfpday.com/events/169)
(Frankfurt, Germany) 📅 2. March 2019

## Prototyping products for the Internet of Things using JavaScript

[Blog post](/prototyping-products-for-the-internet-of-things-using-javascript) ·
[Slides](https://docs.google.com/presentation/d/1E1PcSo463K_1uQTKYZ6IDgOwEwaxrirpTYMvgiL0as4/edit?usp=sharing)
· [Video](https://www.youtube.com/watch?v=HpNv8Ahb2MU)

In 2018 we will see a big change in the IoT landscape: based on LTE-m devices
can connect to the internet over long distances and will be running off
batteries for years. Learn about the principles and protocols involved and how
to leverage JavaScript down to the hardware to build your own solution.

🇳🇴
[AWS UserGroup](https://www.meetup.com/de-DE/AWS-User-Group-Trondheim/events/249419495/)
(Trondheim, Norway) 📅 15. May 2018 ·
[Slides](https://docs.google.com/presentation/d/1KJ34Tjs1-6hFrJKdHwERUQr_x8vTpDbBv7Ps6MKbm-c/edit?usp=sharing)  
🇪🇸 [J On the Beach](https://jonthebeach.com/) (Málaga, Spain) 📅 23-25. May 2018
·
[Slides](https://docs.google.com/presentation/d/1vMFDSY8kn52SxnC_iEUcmJ7SJY8jpfi__oAulxE-uvQ/edit?usp=sharing),
[Video of Q&A](https://coderbyheart.com/jotb2018-interview)  
 🇳🇴 [NDC](https://ndcoslo.com/speaker/markus-tacker/) (Oslo, Norway) 📅 11-15. June
2018 · [Slides](https://docs.google.com/presentation/d/1cqPLtr5r8eP4GcPPBLDb46UOjHU6xH8UMCZx5pAHa0c/edit?usp=sharing)  
🇩🇪 [code.talks](https://www.codetalks.de/#talk-181) (Hamburg, Germany) 📅 19. October
2018 · [Slides](https://docs.google.com/presentation/d/1E1PcSo463K_1uQTKYZ6IDgOwEwaxrirpTYMvgiL0as4/edit?usp=sharing),
[Video](https://www.youtube.com/watch?v=HpNv8Ahb2MU)

## What is the best backend language

[Blog post](/backend-languages-panel-at-code-talks-hamburg-2018/) ·
[Video](https://www.youtube.com/watch?v=7n3ROn3yABY)

Panel at code.talks Hamburg.

🇩🇪 [code.talks](https://www.codetalks.de/#talk-181) (Hamburg, Germany) 📅
October 19th 2018

## Motivating developers with purposeful work

[Slides](https://docs.google.com/presentation/d/1h9JkH7vF_w_s37DTu4iMImKvHxZletoKDoniTe1r4cI/edit?usp=sharing)
· [Video](https://www.youtube.com/watch?v=ycE_1uwlE-M&t=2m59s)

I work at a company where we decide on our own, when how and on what we work; I
have full control over my life. We believe that working in a so-called network
organization, without central leadership, is the only sensible and sustainable
way to run a business. But what does that mean for managers if you no longer can
assign work to your team? New skills are required and in this talk I want to
give a glimpse into the future of tech-leadership and what is need from you to
build a joyful workplace for team.

🇦🇹
[Topconf](http://topconf.com/linz-2017/trackevent/motivating-developers-with-purposeful-work/ "Topconf Software Conferences are premier international software conference designed for Developers, Product owners / managers, Architects, Project Managers, Methods- and Process-Experts.")
(Linz, Austria) 📅 2. March 2017

## TDD vs. Velocity: Testing for start-ups and other organizations with fast innovation cycles

[Slides](https://docs.google.com/presentation/d/1syRztRCV8BeF9p1vAHy6AepvNUa1n2hUUBRskbqx_3k/edit)

These days, when every new project is a start-up, we need to run software that
is both robust (because there are customers already using it) and open for
change (because we are constantly adding new features). This provides a
challenge for applying TDD.

🇩🇪
[Tradebyte /dev/night](https://dev-night.io/ "/dev/night - Meetup für Entwickler")
(Ansbach, Germany) 📅 May 16th 2017  
🇩🇪 [Developer Camp 2017](https://developercamp.io/) (Nuremberg, Germany) 📅 17.
May 2017

## 5 years CTOing: sharing the good and the bad

[Slides](https://docs.google.com/presentation/d/14Q6FQUg2YNkFINWAMSHyKKP1-h11kQ51dc9r_j70PAQ/edit)

Sharing my experiences working for 5 years as the CTO for DeinBus.de, dotHIV,
Fintura, and Resourceful Humans.

🇩🇪 [Developer Camp 2017](https://developercamp.io/) (Nuremberg, Germany) 📅 17.
May 2017

## Tools + Tipps für Freelancer und Selbständige

🇩🇪 [Donnerstalk im Heimathafen](https://www.facebook.com/events/628000664046095)
(Wiesbaden, Germany) 📅 February 2nd 2017

## There is no half-remote team

[Slides](https://docs.google.com/presentation/d/1wOsTthhK1rgmSYl6ZChHzSTD3hkMjmlkfZKnlgQtU94/edit)
· [Video](https://www.youtube.com/watch?v=wxpZZN01VKY)  
German version:
[Slides](https://docs.google.com/presentation/d/1ucg24JaR8IEz4HCNrd9TRRq6lY8g3kU17pwuaqkPihE/edit)
· [Video](https://www.youtube.com/watch?v=ZO2bYPOlhf8)

Having remotes on the team enables you to hire for talent and not for
availability. From my recent positions I learned that it is critical to encode
remote work in every team members work habits-even if they are working on
location. This talk highlights the issues that arise when teams or not
co-located and how to deal with them.

🇦🇹
[TopConf](http://topconf.com/linz-2016/trackevent/there-is-no-half-remote-team/)
(Austria) 📅 2. February 2016  
🇩🇪 [Webmontag](http://wmfra.de/) (Frankfurt, Germany) 📅 11. January 2016  
🇩🇪
[WJ Frankfurt](http://www.wj-frankfurt.de/?module=*termin&id=10210 "Wirtschaftsjunioren bei der IHK Frankfurt am Main e.V.")
(Frankfurt, Germany) 📅 10. May 2017

## Automating library releases and dependency management in JavaScript

[Slides](https://docs.google.com/presentation/d/1RkvHqO80KTH-udkOvnKHd8qc3MBIzc6DC62EYlcXciA/edit)

This talk will walk through all the packages and services necessary to automate
dependency management in your JavaScript project. Added bonus: you will lear how
to automate the release of your libraries, too!

🇩🇪 [Developer Camp 2017](https://developercamp.io/) (Würzburg, Germany) 📅 17.
May 2017  
🇩🇪
[FrankfurtJS](http://www.meetup.com/de-DE/FrankfurtJS/ "FrankfurtJS is a JavaScript, HTML5 and NodeJS user group in Frankfurt currently organized by Kahlil Lechelt, Jo Meenen and Eugene Terehov."),
[#10](http://www.meetup.com/de-DE/FrankfurtJS/events/233554467/) (Frankfurt,
Germany) 📅 12. October 2016  
🇩🇪
[JS CraftCamp](http://jscraftcamp.org/ "A BarCamp about JavaScript and Software Craftsmanship")
(Munich, Germany) 📅 October 8th 2016  
🇩🇪
[SoCraTes 2016](https://www.socrates-conference.de/ "International Software Craftsmanship and Testing Conference in Germany")
(Soltau, Germany) 📅 25. August 2016  
🇩🇪
[Entwicklertag](https://entwicklertag.de/frankfurt/2016/bdd-end-end-browser-testing-mit-nodejs)
(Frankfurt, Germany) 📅 10. March 2016

## Keynote: Wie man ein Top-Down Unternehmen in eine Netzwerk-Organisation wandelt

[Slides](https://drive.google.com/open?id=0B-LQs0Ik2hPpeXpKZ0M1cFcxc0U)

This talk dives into the Resourceful Human way of transforming a hierarchical
organization of followers into a network of entrepreneurs.

🇦🇹
[HR Inside Summit 2016](http://hrsummit.at/ "Der größte HR Event Österreichs. HR-Fachkongress und Messe in einem Event. Wissenstransfer - Networking – Entertainment")
(Vienna, Austria) 📅 13. October 2016

## Introducing: Prototype Fund

[Slides](https://docs.google.com/presentation/d/11n3lDTEqAf6p-U2lQaSdtgjTpAhrDk8qtiIg_qH21kE/edit?usp=sharing)

This talk introduces the [Prototype Fund](http://prototypefund.de/), the
incubator for open source and civic hacking projects by
[betterplace lab](http://www.betterplace-lab.org/en/ "betterplace lab is a digital-social think-tank in Berlin."),
[Open Knowledge Foundation Deutschland](https://okfn.de/en/ "The Open Knowledge Foundation Germany is a nonprofit organization that advocates open knowledge, open data, transparency, and civil participation.")

🇩🇪
[Webmontag](http://wmfra.de/ "Der Webmontag Frankfurt ist eine Veranstaltungsreihe zu Gesellschaft und Technik mit spannenden Vorträgen aus IT, Marketing/PR, Wissenschaft und Kultur. Angetrieben von den Möglichkeiten des Internets findet sich die Rhein-Main-Netzgemeinde rund um das Themenfeld der digitalen Transformation zusammen."),
[#80: „Classic”](https://www.xing.com/events/webmontag-frankfurt-80-classic-1684249 "Der Webmontag Frankfurt ist eine Veranstaltungsreihe zu Gesellschaft und Technik mit spannenden Vorträgen aus IT, Marketing/PR, Wissenschaft und Kultur. Angetrieben von den Möglichkeiten des Internets findet sich die Rhein-Main-Netzgemeinde rund um das Themenfeld der digitalen Transformation zusammen.")
(Frankfurt, Germany) 📅 11. July 2016

## Was Startups von Konzernen lernen können

[Slides](https://drive.google.com/open?id=19r-8sRswqTx54mFMERtgAkr2-IXFsOsj2Asvw-o1YEU)
· [Video](https://www.youtube.com/watch?v=c8tx35r7-44)

This talk summarizes some of the aspects that big corporations can learn from
startups.

🇩🇪
[Webmontag](https://www.xing.com/events/webmontag-frankfurt-79-startup-1675857)
(Frankfurt, Germany) 📅 2. May 2016

## ART Expert Talk: Agil Arbeiten in verteilten Teams

[Slides](https://docs.google.com/presentation/d/1q0PcMZbVJ4QsgEIvPFZ6xwEWA3P-s6qaYMvW30BA0yU/edit)

Insights into how distributed teams can work effectively.

🇩🇪
[DB Systel Agile Round Table](http://digitalspirit.dbsystel.de/mit-agilitaet-gemeinsam-zu-besserer-software/)
(Frankfurt, Germany) 📅 28. May 2016

## Node.js / CQRS / ES / Redis app architecture showcase

Session at [unKonf](https://www.unkonf.de/) about an architecture built on top
of event-source (ES/CQRS) using Node.js and Redis.

🇩🇪 [unKonf](https://www.unkonf.de/) (Mannheim, Germany) 📅 16. April 2016

## Using make in frontend projects

[Example](https://github.com/ResourcefulHumans/graph-demo/blob/9b35bca0798594249091ffd3d4434e6b1628bac8/Makefile)

Session at [unKonf](https://www.unkonf.de/) about why you don't need Gulp or
Grunt.

🇩🇪 [unKonf](https://www.unkonf.de/) (Mannheim, Germany) 📅 16. April 2016

## Code is not poetry

[Slides](https://drive.google.com/open?id=1qgluNt7gsR9ulgaJl4YP5SFIuRJydMWKGVgTBXH6mj4)  
German version:
[Slides](https://docs.google.com/presentation/d/15pjuzV6sG14bnGwRd3PuwYLrOyu0uVEllTj7emhTvUg/edit)
· [Video](https://www.youtube.com/watch?v=_Tzrc9mh37U)

A (very opinionated) talk about why software developers are merely glorified
plumbers.

🇩🇪 [Webmontag](http://wmfra.de/) (Frankfurt, GErmany) 📅 8. June 2015  
🇩🇪
[Technical Summit 2016](https://www.microsoft.com/germany/technical-summit/default.aspx "The larges German Microsoft Conference for developers and IT professionals.")
(Darmstadt, Germany) 📅 6. December 2016

## Software Development Process at Fintura

[Slides](https://docs.google.com/presentation/d/1UKDy9MMkLq08XRHNPiB8OrYD3zLWwmBulb9K5dU6Hsc/edit?usp=sharing)

How we build software at Fintura.

🇩🇪 [Coding Night](http://www.meetup.com/de-DE/Coding-Night-Frankfurt/)
(Frankfurt, Germany) 📅 17. July 2015

## Tech Stack at Fintura

[Slides](https://docs.google.com/presentation/d/11GgGze02kaFlJVBWJtv-GeWAB8MfppG4GkT55EBeQTg/edit)

How we run software at Fintura.

🇩🇪 [Coding Night](http://www.meetup.com/de-DE/Coding-Night-Frankfurt/)
(Frankfurt, Germany) 📅 17. June 2015

## Trello

[Slides](https://docs.google.com/presentation/d/14wTDlzPjKTu5h5hOHGTWj8VEhvQOnZBDCvwCqaKgUag/edit)
· [Video](https://www.youtube.com/watch?v=DV0SC01R9kc)

A talk about the best project management software on the planet.

🇩🇪 [Webmontag](http://wemoof.de/) (Offenbach, Germany) 📅 27. February 2014

## #futureofwork in the wild

[Slides](https://docs.google.com/presentation/d/19pEr71BmekzbN5D67K2lOvmuHUlV_0_9g4gMgu-OWjw/edit)

A talk about great examples of non-traditional organization concepts.

🇩🇪 [Agiler Stammtisch FFM](http://asffm.blogspot.de/) (Frankfurt, Germany) 📅 2.
April 2014

## dotHIV

[Slides](https://docs.google.com/presentation/d/1SzhOkZYPlX4qomxdCCm1MHZgdcsU8kl8zdkZRsqbnX4/edit)
· [Video](https://www.youtube.com/watch?v=h36BGbdYfzs)

Introducing the dotHIV initiative.

🇩🇪 [Webmontag](http://wmfra.de/) (Frankfurt, Germany) 📅 10. November 2014

## .riesengeschäft und .geldmacherei?

[Slides](https://docs.google.com/presentation/d/1CDblqJHUc3piD9VOpOWwWBf28tXJWCmoAefOcMUow7I/edit)

Wie der dotHIV e.V. den #newgTLDs ihre Daseinsberechtigung gibt

🇩🇪 [Webmontag](http://wemoof.de/) (Frankfurt, Germany) 📅 24. August 2014

## Cloud Worker

[Slides](https://docs.google.com/presentation/d/1BI_3-ua0IVl4P4dakHB4hXzn9h3wmVJHw0hZ5SO_hMo/edit)

**Update January 2020:** I've revisisted this talk
[here](https://twitter.com/coderbyheart/status/1212874457964064768).

🇩🇪 [Donnerstalk im Heimathafen](http://heimathafen-wiesbaden.de/) (Wiesbaden,
Germany) 📅 4. April 2013

## Mein Traum - Mein Startup

[Slides](https://docs.google.com/presentation/d/1PEo6dQbTyloN_v-XxxOLK1j4pHjE8n8eDAqI36Prlqw/edit)

🇩🇪 [Hochschule RheinMain](https://www.hs-rm.de/) (Wiesbaden, Germany) 📅 15. May
2013

## Warum Offenbach einen Webmontag braucht

[Slides](https://docs.google.com/presentation/d/1uYe0LAyZ5ujMCvMv0PyM090KE6ubz7Jz2lF_pXXguPQ/edit)
· [Video](https://www.youtube.com/watch?v=fHV7ur7JUxQ)

🇩🇪 [Webmontag](http://wemoof.de/) (Offenbach, Germany) 📅 13. May 2013

## #ugrm – UserGroups RheinMain. Ein Überblick über die Szene

An overview over tech tech meetup scene in the RheinMain region.

🇩🇪 [Webmontag](http://wmfra.de/) (Frankfurt, Germany) 📅 8. April 2013

## Coworking Szene RheinMain

[Slides](https://docs.google.com/presentation/d/1eHVyhQPE4drzoSlY0rRqPD1w5wddF0MJNMqTL3Fh-cA/edit)

Highlighting the coworking initiatives in the region.

🇩🇪 [Webmontag](http://wmfra.de/) (Frankfurt, Germany) 📅 12. November 2012

## RESTful APIs mit Django

[Slides](https://docs.google.com/presentation/d/1AK_sn88E1hIX0FQmgzjd8XFBR7i32b1JgsPQt1b1B8w/edit)

How to build RESTful APIs using the Python-based Django framework.

🇩🇪 [Python UserGroup RheinMain](http://pyugrm.de/) (Frankfurt, Germany) 📅 18.
July 2012
