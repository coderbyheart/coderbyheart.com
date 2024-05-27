---
subtitle: Talk
title:
  "Software Quality made this talk happen: push-to-deploy as the means to deal
  with uncertainty"
abstract: >
  This talk is an encouragement for developers to trust their skills and tools,
  but also invest in mastering them.
date: 2024-05-16T13:30:00.000Z
---

[Video](https://vimeopro.com/newcrafts/newcrafts/video/949429939)

<div style="padding:56.25% 0 0 0;position:relative; margin-top: 2rem;"><iframe src="https://player.vimeo.com/video/949429939?h=3f1f414cca" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>
<script src="https://player.vimeo.com/api/player.js"></script>

I was first paid to write software in 1997, now 27 years ago, and if there is
one skill that had the biggest impact on my career then it’s the ability to
deliver working software that doesn’t break. This allows me to take vacation,
invest back into my communities and initiatives that I want to support,
self-development, and to have time for self-, and family care.

In this talk I want to reinforce your love for software quality by sharing how I
helps me in my day to day work where I balance my efforts between too many
projects but still manage to be both and innovative software engineer, and
deliver solutions that do not break when it matters most through setting up all
projects and teams that I work with around one main principle: push-to-deploy.

In order to achieve this, confidence is needed, which can only manifest if we
know that our changes will not break the system. And in an environment that
becomes more and more uncertain and volatile every day, there is only one
solution that has stood the test of time: writing tests first. And its beauty,
especially with outside-in-test-driven-development, is that it helps to keep the
focus on delivering value to the end-user. Over the last years I have added
Behavior-driven development to my quality toolbox because it decouples the
implementation of the tests from the implementation of the application. Testing
through the public API of a system ensures that there are no unexpected changes
for the user.

As I will share, I have a strict focus on user stories when building our
products, because it is the only way that ensures that all stakeholders can
participate and contribute to a product. Because in the end a successful
software is always built in collaboration with people who contribute source-code
and those who contribute in other ways.

Enabling the collaboration of all stakeholders is a very important part of my
job, and I have been able to achieve this through using a walking skeleton
approach: delivering working minimal products from the first day. This way
developers like me can make sure to be involved in the discussion with product
people and customers early on in a projects' life-cycle. And in my experience
only the real product (and not even a click dummy) will truly create shared
understanding with all stakeholders. Because time is always short and we know
that every prototype ends up in production we have to make sure that even our
prototypes are of high quality; which is where using quality in software
development to achieve continuous delivery (CD) with confidence - really shine.

The slides are available
[here](https://drive.google.com/file/d/1ZrrTc4YdN0C23C1GOXilOaD4eCfsplYO/view?usp=sharing).

## Video transcript

Thanks for joining me in this talk.

I can be here because software quality is the story of my professional career.

And given this is the 10th edition of New Crafts, I thought it would be time to
remind you why we do what we do as crafters.

My story goes back till 2012 when I became a crafter, but now I have colleagues
who could be my kids if I had them.

Like they're in their early twenties and they, they study, or they become
juniors and they are the next generation of software engineers.

And we as crafters need to think again like, why are we doing this?

And we need to explain this.

And this is, this is what I would like to share with you.

This is a talk that is very personal, so not everything that is in there might
apply to you, so keep that in mind.

But I hope you can take away a few things in there.

So, a little bit about me.

I am an R&D research and design engineer from, Nordic.

I work on cloud stuff, at the semiconductor company.

So my company makes money selling chips that connects your smartphone to your
headphones, the pencil on this fruity tablet that you have or tracks the medical
the pharmaceutical products that you need, and, and allow that to happen.

I work in Norway.

I'm not the only one from Norway.

I hear we have two more speakers from Norway, so I'm pretty proud of that.

You can find all my links on
[coderbyheart.com/socials](https://coderbyheart.com/socials).

The slides, I've shared them on my Mastodon profile in case you want to follow
the links or whatever, but you can reach me there.

So first let's recap a bit.

What is push to deploy?

Push to deploy means:

when I do a change on the thing that I'm working on and I committed to my
versioning system, probably Git in most of the cases, and then I push it,
meaning I push it to the, to the server, make it available to, to everybody in
the team.

So I push it from my local computer to the source code repository that we use as
a company.

But then from there, it should trigger the chain, your pipeline, your flow, that
puts it in front of the real customer.

And it's not the test system or it's not your colleagues, it's actually whatever
makes you money.

So it can be, if you are software as a service, it could be your website that it
shows up there, or, if you're shipping, software to other of your collaborators,
your customers, then it arrives there and they can use it.

So this is really important fact that we, we want to optimize for this.

And this is, when I, when I talk about push-to-deploy, this is what I mean.
Deploy is not just is it running somewhere, but is it used by the end user?

And there is a fantastic book, I hope all of you have read it.

If not, this is a reminder to read Accelerate because, the first half of this
book explains why push-to-deploy is so amazing.

And then the second part is it actually shows the proof how they figured it out.

The scientific background, the methodology they used, is explained.

So A, if you want to convince somebody, you can prove that the numbers in there
are correct, and B, you can apply this methodology in your company as well to
test and figure out and learn more on how to get code faster into production.

Push-to-deploy is kind of a mantra for me.

There are so many principles out there that we learn as crafters.

We get some of the very outdated ones.

S.O.L.I.D., we get, maybe, I dunno, TDD, is kind of a principle, that we learn
or inside-out-testing, outside-in-testing, Domain Driven Design, like all of
these are many concepts that are very good.

But for me, I feel that over my experience over the last years, it's really
that, focusing on this thing, getting the code out there as fast as possible,
applies in any domain that I've worked on.

I now work in IoT, but I've worked in FinTech, I've worked in the gaming
industry, I've worked in in advertising, in marketing.

So kind of everywhere this would and will still apply.

So it's a universal thing, principle, and it's really easy to remember what to
do, how to get there is the hard part, however.

So why do I want it?

What does it give me?

It's not because I get surprises from it, it's to deal with surprises.

And I think we understand now since like maybe the last five years, this is more
or less common, is that we live in a volatile world.

Everybody went through the pandemic.

That was probably the call for the globe that nothing can be predicted anymore.

Until before that we had some financial crisis.

We had 9/11, we had some of these Black Swan events that nobody could predict.

And even if you can predict them, then you don't know what effect they will
have.

And that makes them really dangerous.

But the overall learning is that it's completely futile to do any planning, any
long-term planning that goes beyond maybe this week we don't know what's gonna
happen next week.

You have surprises everywhere.

Like you get surprises if you build a product for your customer.

Your customer last week said, I want this button on the left side.

And then they get the new Chief Marketing Officer and they say, no, I want it on
the right side.

Here's money. Make it happen. I don't care.

So, and you can tell, but last week you told us left side, and now you're
telling right side, and yes, fine, I'm the customer, I'm paying. Surprise
change.

And you can, and we heard here, sometimes you need to push back and say, no,
that's not right.

But sometimes it's just like that.

They want it, it makes sense. They change their business.

So we need to follow their decisions or they will pick another vendor.

Surprise success is, is great to have, but can come at a surprise.

You build something which is kind of ahhh ... it's gonna be a cool prototype.

Let's see how that works.

And then like two weeks later you learn oh, this is the main showcase at the
trade show that is happening in Barcelona.

That happened to me, more than once.

When nobody tells you oh ... your stuff is gonna be used in that way, but it's
just this because it works.

We all got that surprise delays.

I can go on endlessly.

I can't avoid surprises.

But I need my team and my solutions that I work on be ready to deal with these
surprises.

And that's were pushed-to-deploy really enables me to do this. Because, anytime
I have this cycle,

I make a change, I put it in front of the customer, I put it in front of my
team, I put it in front of my stakeholders.

And by the way, over the lifetime of your product, your customer will change.

If you start a new project, in the first day, you are your customer because you
want to see that it runs in, in the cloud and that kind of the bootstrapping
works and that you have all the pipelines in place, then you are the customer.

Then next week you're showing the product to your product manager and to your
team.

Then they are your customers. And then this changes over time.

But the idea is the same.

The people that give you money, that give you power that you need to agree on
what you're doing, that basically grant you the freedom to keep working on this
project.

These are your customers and you, every time you put it in front of them, you
get feedback.

I list some features that I get from these fast feedback cycles.

Really if you've been following Thierry a bit he's here on this conference as
well.

He has really, really elaborate and very good ran about why, feature branches
are evil.

And if we do push-to-deploy, meaning we all commit to production code and there
is, at any given moment in time, we can release our software to the wild.

There are no feature branches.

That also means there are no longstanding conflicts where you have a long living
branch and then you, you kind of don't put it in production, but you put it off
and then you come back and then you need to merge everything together to get it
to work.

Don't do this. It will save you a lot of work.

And, it will also not block others if they depend on your work.

Just finish your work.

"Just" an evil, very evil word.

Just finish your work.

Get it in production then everybody else can depend on what you've done.

Of course, that just finish your work means we need to kind of slice our work
smaller and smaller iterations so we can basically drop whatever you're working
on.

When I work not on any project, basically on any project, if somebody comes to
me and says, Markus, I need this.

I am prepared for this because, again, I can't predict if they say, is this
important?

Of course we assume, let's assume just they have a good point why they want me
to do this.

Then I'm able to drop what I'm working on maybe within one, two hours.

I don't need it immediate, but I can finish what I'm working on, finish, write
my test, put it in, push it, release it, maybe put it behind a feature flag, but
it's out there.

I can drop it, I can get my mind off it.

I don't need to remind my colleagues, "Hey, I'm still working on this."

"Please wait. Or please rebase your branch against it."

What, whatever. I push it out, it's done.

I can shift my focus.

And with a lot of surprises,

shifting focus happens constantly.

There's unfortunately, a big learning in my career is: you cannot avoid these
surprises.

I tried it many years ago. It didn't work out.

Reiterating it a bit, unfortunately, the surprises also come from many things
that you don't like.

There are positive surprises, but very often there are unfortunate surprises.

So we want to be, and we need to be in this constant loop where shit's fucked.

Meaning like you have technical depth that you need to change in order to get
this new feature, or there's a new feature that you don't want to do, but you
have to do it.

And then yes, we need to change it.

And sometimes this means we need to completely change our architecture.

Alberto said this so good
[in his previous talk](https://vimeopro.com/newcrafts/newcrafts/video/949429828).

If you haven't been here, please watch it.

We can only make decisions based on the knowledge we have now.

But we cannot limit the future capabilities of our systems based on the past
knowledge.

We learn new stuff, we learn that there is new value to be created and we need
to go where we can create this value.

And that sometimes unfortunately means we need to change everything.

So we need to fuck shit up, so we can find it out.

So we can find it out. This loop.

The faster this loop is, the more we learn, the less painful it becomes.

The pain will never go away.

It will always be painful.

There will always be this phase, "Oh my God, not again."

"It's fucked again." But we can get out of it.

So we get this good end of feelings of okay, customer's happy, we changed
something.

My colleague is happy. It is on a trade show.

Oh, there's good, PR about it.

My marketing colleagues are happy. Hmm.

That gives me then the motivation.

The next time when somebody comes to me with, "Hey Markus, can we change this?"

I'm like: "I hate you for it, but yes, of course we can."

What we need in order to be able to push-to-deploy however, that is where the
craft comes in.

The plain process of I push code and it goes online.

Well, that's that there's no magic.

Like you pack whatever your artifact is of your source code and put it on a
server, and then user does a request and hopefully it works.

And of course we want to eliminate this "hopefully".

We want to be certain that it works.

And the only way to get to this point is to write tests.

There, there is no way to do this manually.

You cannot do manual testing.

If you have a high velocity, if you release, change your production multiple
times a day, there is no chance in the world that you get good manual tests.

Well, you can pay for it, but it, it doesn't make sense.

It economically doesn't make sense.

So you need automated tests.

This will give you the certainty that, okay, the change that I'm now making,
that's usually where you have a high confidence because this is the, the small
part in your code where you just work on, you have all the things in mind.

"Okay? It's touching this database here, this is working."

Where you probably can get away with little tests, to make sure it works because
you also just tested it.

The problem is all the other stuff out there in your system that you completely
oblivious to that it even exists.

Maybe it's not like you've never touched it, you've never seen it.

If there are no tests there, but you kind of change something here, then this
will break the system.

So we need good tests over the entire system to make sure that even small
changes, we don't accidentally break something.

We also write, of course tests, for ourselves.

Even I have to drop something, I would, very often then if I'm not finished with
the the feature I'm working on, write a failing test or a skipped test that
says, okay, I want like this thing to work like this, put it in a test, commit
it, it will be there, it will be marked as skipped.

But the next time I pick it up, I can go back to this test because this test,
and I design outside-in and this test will tell me: "Hey, this is kind of the
thing", "that the user wants to do."

And then, okay, alright, I remember, okay, now I know what to kind of implement
under the hood to get it to work.

And of course, like this is the fight we constantly have as crafters, who
believe in testing is the people who are not there, yet.

Who kind of know it's good, but it's too much effort.

This is our job to make it easy for them to follow us.

We can't just say: "Oh, let's go there.", "This mountain is not so high as it
looks like it's kind of, it's fine." "You will be fine." No, we have to go
ahead. We need to lead with good example. We sometimes even need to make the
path there.

Because getting started is really, really hard.

The thing at the side here, yes, of course, don't have too many tests.
Especially when we start with TDD, we start making, building a lot of tests.

And then at some point we have many tests that cover the same feature or are no
longer really useful.

Remember to delete your tests.

Because this will remove cognitive load from everybody who's coming in later and
trying to understand what is essentially happening here or have like a giant
file that tests all the variants here.

Maybe it's not super useful for them to understand it.

And this is where we come to the vacation part.

I'm now not working, on code.

I'm here on stage and on this conference.

If I have well-tested code, I can even be productive while I'm doing nothing.

So, here's an example from my inbox.

This is like Thursday, Friday, Saturday, Sunday.

So while I'm not working, I'm still producing value respectively, not I, but the
code base that I created is covered in a lot of tests that I can deal with the
messy state that the JavaScript ecosystem is in, where we get dependency updates
every hour.

And if you want your code base to not be outdated, you basically need to deal
with this in an automated way.

And having a well tested code base means if a new dependency changes, a test
will be run, it will be checked that it works.

And if it works, we bump the dependency and release an new version to
production. we get automated security updates.

We get new, not new features because we don't use the new features, but maybe we
get performance improvements.

And the best thing is, if I get back from vacation, I did three weeks vacation
now, I come back to a code base with basically no new PRs.

Nobody needs to take care of maybe stuff that piles up while I'm away on some of
my projects where not more people are working on it.

Again this mindset push-to-deploy, means a bot, AI, hello, a bot can create a
commit.

It gets automatically verified. Is it good?

And if yes, then fine.

I talked about this principle where, I can save the work that I'm working on and
I save the intended user feature.

That was a hint on, what I think is for me, really the best way to approach
this, push-to-deploy and the fast feedback cycle is using outside-in TDD.

Very, very simply explained.

If we talk about writing tests we have a calculator and we have a function that
adds two numbers, or we have a calculator, it's the product, I want a
calculator.

So I can implement my calculator and the test for it by really starting to
implement all the features.

Like I have an add function and I write a test for it.

I have a subtract function, I have a root function.

And then so I build all these small things that a calculator should be doing.

"Oh, let's pull in modulo. What else do I have?"

I need to deal with rendering maybe exponential numbers, how to display floats,
whatever.

Like I can spend a lot of time on testing all the components and then I pull
these together into bigger components.

But since everything is covered under here, this goes very fast then.

But I can spend a lot of time in the depth of some obscure feature that I might
be needing to test it.

Where outside-in TDD is really taking from the beginning the perspective of the
user.

It's not deconstructing the calculator into its small components, but it's
saying:

"Hey, as a user, I want to add two numbers.

Then you have the calculator and say, given two numbers, I expect the sum.

You have a user story already and you get clarity from your stakeholders.

Okay, this is what we want.

None of your stakeholders said they want to do modulo.

Nobody says they want fractions.

Maybe you will never need it.

So when, when you use outside-in TDD you really focus on the features and you
only do that.

And this is really, really helpful to, to make sure that you only implement the
necessary stuff.

However, that means there is, there will be some maybe shortcuts or not like
super optimizations for any kind of use case that will lead you later to do more
refactoring.

But then at least we know that the refactoring is needed.

Like in the beginning, I have a calculator which has the add implemented, just
in the main function.

And if I have 20 different operations I probably want to refactor this in into
smaller modules, so it's easier to compose, but maybe I never need this.

The ultimate hint for you and what to really look into, I think is, Behavior
Driven Design, which really takes this to an extreme that it decouples the
testing, the language the tests are written in, from the actual implementation.

And BDD takes a step that it moves your basically description of what the thing
does.

There is a user who has a calculator and then they input two numbers and they
get a sum out of it.

They put this in like written plain English text.

And now when you have a plain English text, you need something that runs this
against your system.

But the cool part is that regardless of what you do here, you can change
everything in your implementation.

You can change the language, you can change from Python to JavaScript. You can
change from Java to whatever this file here with your test.

That will not change.

And there's a really beauty in it that it preserves your intended behavior of
your system in a state that is not affected by any refactoring.

And I've seen this so often that when you start refactoring and removing stuff,
you start uncommenting tests and maybe delete them, maybe move them around.

You forget to turn them on or add them back.

And that can happen. Where if you have a BDD feature, it will not.

So that is really an important, way to capture the behavior of a system in a way
that's also understood by all stakeholders.

I know that's a myth that with BDD, I can go to my product manager, and say:
"Hey, let's write a BDD scenario together."

That's not true.

I don't think many people have managed this, but at least like they can, if I
give it to them and say: "Hey, this is what my system does," "it takes two
numbers and gives out a sum" they can understand it.

They don't get scared by some syntax, by curly braces.

And they are willing to read this.

And also new people who come in a team, they can start browsing through that
without needing to dig through your source code system to figure out what's
actually happening in which unit test is relevant.

I can talk forever about BDD.

It's also amazing because it groups together features or or implementation into
things that a user would do.

A good example is that, you very often see, you have a, a storage class, a
repository implementation that can store stuff.

And often it's really stuff because it's generic, it's not a book storage
because you don't need that.

Technically, a database can store anything.

So your database repository adapter will also store anything.

And that's not helpful. Like the user is not using a repository, the user is
using your website.

And then they have a list where they can add features.

So, and if you have a feature that connects this part of your source code to
this feature, you know exactly when and where it's used.

That was just a glimpse of where like this explodes in complexity of how to
test, why to test, what to use, what technology to use, which approaches to use.

And, the unfortunate truth is that, it is extremely hard to get started.

The effort it takes, like when there are no examples in your source code base,
is insane.

And it's super frustrating.

And then over time, the more examples you have, it gets easier.

I'd say that at some point, like if you have too many examples, it might even go
up, because then your test suit gets too long, the runtime gets too long,
whatever.

But that's unfortunately the truth.

And that's what I said before, like, we need to be good at giving examples and
be a good example.

So how do we get there? How do we become good?

I know I want to test and I was in, in many times in a situation where I came
back from a conference, heard about this testing is cool, and then at work
nobody writes tests.

And this has worked for me in my career very well.

The 20% rule, which basically means if I have a new project or I have an
existing project, but I want to learn something new where this could work.

So for instance, I want to try out event sourcing. I know I have kind of, we
have never done this before to, to make events the main source of truth for our
system.

We just use MySQL and do updates.

That's fine, but I really want to try it.

So I would then risk it.

That's the truth.

Like 20% means of the deliverable, like using event sourcing is maybe 20% of the
features.

And if I figure out at some point "okay, it won't work" "it is the wrong
decision" I still can go back and rip it out and use the old approach.

You can do this for everything you have 20% of your time you can always carve it
out because you have, after some point of time, you have enough knowledge on how
to build a system, and very often you repeat stuff.

So try to introduce some experiment even in your own code, you might learn with
it.

And if it fails, well, you take a weekend and implement it the old way.

And this can even work as a team.

You need a commitment to that, but there is room for it. the next thing is and
this is a thing that worked well for me, but the gist in here is that we become
good by learning not everything.

We need to find the things that work for you.

And that's, that's okay. You can't know anything.

It's just too much. But learn some of the techniques that serve you well, and go
deep on them because the truth is there is not one thing how to implement
anything.

There is always another way to do it.

And so the same with testing.

I said outside-in is great.

There are enough people and example that say no inside-out is the only way to
go.

And we both are right. We get good systems.

It's just for some of you, it the one way works the other way maybe doesn't.

I talked about end-to-end testing.

Push-to-deploy also depends on one of these ideas here. Reproducible builds. You
need to learn how to package software in a way that you can kind of repeat it,
repetitive, deploy it.

If you learn this by the way, you go into scalability.

I put RegEx on here because for me, RegEx allows easy refactoring.

I can using RegEx, do a lot of refactoring.

I personally, I don't use refactoring tools in IDEs.

I too often change IDEs.

I was forced to use Vim when I was in my early companies.

So I came from a path where I didn't have IDEs in the beginning.

So I know how to clone hundreds of repositories and do changes across many
repositories at the same time using RegEx because I also am not afraid of code
duplication.

Another thing here, code duplication is not a bad thing.

It allows you to quickly iterate.

I don't need to make code reusable so I can apply it with all the like,
perfectly designed APIs in multiple projects.

There's no value in it.

It only becomes a problem if you have bigger code bases that reuse the same
piece of code that has the same bugs, but then well, you still can use RegEx to
find it and fix it.

This is where craft really comes in.

One of the ideas is that we have is that, we try to understand the tools that
exist, keep an open mind, that's really important.

What is out there? Have a look at it, do these experiments, but really find the
tools that work well for you because only then also can you explain it to your
team?

Why are you doing this? Why are we doing code duplication here and why not here?

How can I deal with tests when I can't run the system, on my computer and to end
testing?

Awesome. So this is, we need to have a discussion with our younger colleagues on
really not on a level "This is how I do it.", "So you have to do it!" but I need
to enable them to understand why we're doing this also because they might find a
better way and then can tell me, Hey, there's a new way to do it.

One thing I would really like to reinforce is that, testing as in test driven
development, is a universal skill.

Meaning if you invest in this, this will be useful for your entire career.

Like it works in, in all languages.

It works in embedded, it works in high level languages.

There's no programming language that can work without tests.

So all of them can work without tests, but there is no language that is perfect
because tests are not for the language.

Tests are for your assumption.

Tests encode your business knowledge and the requirements that you have.

Yes, you might write some tests that your data is stored correctly in the
database or the integration against an API works, but mainly tests serve as a
documentation.

That's why I put this blue reminder here.

Don't test your language features.

If you have a feature that calls some functions and you have, for example,
TypeScript, like I see this very often in, in lambda functions like a Lambda
function pulls in some collaborators and then passes in an event to another
collaborator.

I don't write tests for lambda functions, which they are very kind of your, the
C and MVC and model view controller.

I don't write tests for the controller.

If I have TypeScript, which then ensures that I can call my collaborators with
the right parameters and everything typed, the input is validated.

So there's no point in like doing language tests.

We can only do this fast iteration if we start owning our own infrastructure.

I've never seen it work well with a DevOps or an ops team, which you hand over
stuff over the big wall and say: "Hey, please run this for me."

And then you just ship them new features and they are responsible for running
it.

They're responsible for performance, for migration, for whatever you need.

Unfortunately, I think that's the truth.

You need to learn more about how to run the things that you're building.

And the way to do it is, of course, going in the cloud, going serverless, or
learning about, deploying infrastructure, using Kubernetes or whatever works for
you.

For me, serverless worked very well.

But one of the like big, big important decisive, books for me to learn and start
learning more about it was, REST in practice.

That's the top one. It is really a fantastic book.

The main idea is like, how can we build systems that work when everybody failed
to build these systems?

The only system we know that really works well for billions of people for the
last 35 years is the internet.

And the internet is built on very simple principles. HTTP requests, status codes
and systems are broken all of the time.

So if you keep that in mind, if that's your mode of, how you design your system,
everything fails all the time.

How to deal with that. This book tells you how to use that, as a way to design
your architecture, and it leads you natively towards a microservice
architecture.

And you can use this and apply this many different contexts.

And if you then go a bit more into the serverless route, then definitely start
reading. the new book that just came out a few months ago, serverless
Development in AWS fantastic introduction.

I'm such a big fan of serverless also because I work a lot in IoT.

In IoT we have this a problem that is made for serverless where we have millions
of devices which connect to your server.

You can't predict it.

It needs to scale.

You can't have one machine that deals with these requests.

There's a long talk, by me about why this is such a great match. many systems
have properties where serverless is really a good application.

You should invest a bit of time into it.

Now we are close to the end of my time, so I want to finish with what I said in
the beginning.

You need the support system outside of work because very often you're alone in a
company, and you're the only one who's pushing this forward.

My journey basically as a crafter was really, really, really supported by the
outside support, not within my company,

but it's really, there's a big community out there that can help you.

And by the way, no, there are no certificates, like softwarecrafter
certification is a scam.

But you can go to my website and get a certificate.

I give them out for free if you want it, but it's a scam.

So the solution, of course is you are already here.

So you did the first step.

You went to, to a conference, to connect with others.

And this is the, I think the only way that really worked.

And if you start digging a bit into the software crafters community, then you
will find there's many resources.

Advocate internally, if you're at the point and you need to grow the others,

I said that before, you need to be an advocate, a good example, but the
inspiration for that, and many have the same problem, that you want to push a
topic and you don't know how is, to go to external communities.

We have a nice website, software craft communities worldwide,
[softwarecrafters.org](https://softwarecrafters.org/), where we list communities
all around the world.

NewCraft is part of this network.

There are other conferences, like I really love the Friends of Good Software
conference, was from a testcraftCamp.nl

Now it's, it's more on, software quality, really great communitie, it is
virtual, you can participate here virtually.

This is really cool. Organize your own, I organize a few conferences.

I organized Codefreeze in Northern Finland, come there, 80 people, a lot of
snow, Aurora, Sauna, and maybe a bit software craft talks.

One thing that really has helped me, and this no longer exists, but I just put
it up here as an example

I also created my own peer groups.

I think, some people call these mastermind circles where you just reach out to
people from other organizations.

And for me, this was a time where I was a CTO in startups in Frankfurt.

That's why #TechLeadsFFM, that's the region.

And I reached out to other CTOs, from startups, and, we started creating this
circle, where meeting as a group, like 15 people.

And then we would have one-on-ones.

And everybody was really thankful that this existed.

It takes really little effort.

So reaching out to a few people, finding a coworking space where you can hang
out with a few beers and do this once every two months.

But the important part is that you kind of connect with others and start sharing
your things and the problems that you have, because everybody has these
problems.

And of course, what I'm doing now is also part of getting better at my craft.

Because when I stand in front of people, this trains your skill to voice what's
important for you.

And I really invite all of you.

I don't want to be on this stage, don't want to see more people like me, white
English speaking dudes from Norway, or from Europe.

I want to see more diversity on conferences.

And unfortunately, it's a giant problem.

So please take the courage and apply.

And the first thing you need

to do is just write an abstract.

You don't need a presentation.

You just need four sentences and three takeaways, and that's it.

Submit it to a conference like NewCrafts.

And if they take you, then you have to make the presentation.

I made a video about this, like how simple it is.

And if you want to write an abstract, I will help you.

We need to get more.

I've been doing this too long, so there need to be more people who are doing
this.

Not so long as I am.

But it's a way, of course, I get to go to the speaker's room, I get to meet
amazing other speakers.

I can just chat to them and learn about stuff.

And get the insight that will, again, help me improve my skills.

It's, it's really invaluable.

So I will be closing with

What's the point of this?

I talked about push-to-deploy, we are learning, we need this skill.

And I'd like to reiterate why do we want to be good at what we are doing?

And basically, Alberto said it before in the talk, we can't just put shit in
front of our customers.

Everything we do needs to be very good.

If it's a good idea, shitty executed.

If it's the most amazing screen design, but the response time is 15 seconds
before the page loads, nobody's gotta see this amazing idea.

They will be gone.

The craft itself it's not an end to itself.

We support business ideas with our craft and through us, we are the conduits
that take the business idea.

And, I might not agree with all of them, but I don't have the data to say to
them: "Hey, this idea is really shitty."

I need to treat any idea that's coming to me fairly, give it my best to put it
in front of the user and let the user decide if this idea is shitty, because
they are paying my salary, not I.

So that really is why we need to be good at what we are doing to give any idea
that is out there, a good chance to survive and maybe to be the surprise success
we have been preparing for.

Thank you very much.
