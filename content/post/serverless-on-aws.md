---
title: "Building serverless applications on AWS"
subtitle: Learning Resources
abstract:
  "This is the material I share with colleagues who want to learn the idiomatic
  way of building serverless applications on AWS"
date: 2025-03-23T10:00:00+01:00
---

I've been building serverless applications on AWS for over ten years. I was
immediately hooked when
[AWS Lambda was launched in 2014](https://aws.amazon.com/about-aws/whats-new/2014/11/13/introducing-aws-lambda/)
and have been using it as the main way to build web services using JavaScript,
and later TypeScript ever since.

For developers who come from classic, instance-based architectures, working with
serverless is a huge paradigm shift. It's not natural, nor obvious. In this blog
post I am sharing the current set of material I give to colleagues who want to
learn the idiomatic way of building serverless.

## The basics

There are some fundamentals when building scalable web services, which apply
both in instance-based and serverless architectures.

[REST in practice](https://coderbyheart.com/rest-in-practice-reading-guide) is a
must read.

[The Twelve-Factor App](https://12factor.net/) provides important design aspects
for web services in general, but this applies very well to serverless
applications.

In my talk
[Serverless Architecture for IoT on AWS](https://youtu.be/E7t6BXGIZHk) I
explains the benefits of serverless in general in why it is especially suitable
for IoT applications. I provide an introduction to serverless in general, and
how it is implemented at the different cloud vendors (looking at AWS and Azure,
where I have implemented the same application using the respective cloud's
idiomatic way), and why it is especially relevant for IoT deployments.

## Learning AWS serverless

Of course, always check the official AWS resources on AWS Lambda:

- [Best practices for working with AWS Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [AWS Lambda blog](https://aws.amazon.com/blogs/compute/category/compute/aws-lambda/)

For training my colleagues I have used the
[AWS Dev Hour: Building Modern Applications](https://pages.awscloud.com/global-traincert-twitch-dev-hour-building-modern-applications.html)
training, with the added challenge of writing tests for it. My colleague Lena
Kråkevik Haraldseid has a talk about her learnings from this exercise:
[Testing serverless applications](https://www.youtube.com/watch?v=0qmAKKqLNsg).

The recently released book
[Serverless Development on AWS](https://coderbyheart.com/serverless-development-on-aws-review)
offers a great way to learn more about the potential of the serverless paradigm
and the mindset shift needed to tap its full potential. It’s a must read for
every developer that works with AWS because more and more powerful services on
AWS are built from the ground up as serverless offering.

## Testing

One of the challenges when building serverless applications is testing. You are
building on the shoulder of giants, and are using services that no longer run on
your (CI) machine. In my talk
[It does not run on my machine: Integration testing a cloud-native application](https://coderbyheart.com/it-does-not-run-on-my-machine)
I take you through the challenge of testing a cloud-native application. I cover
the challenges when developing solutions on top of serverless components which
you cannot run on your own machine and how I designed a BDD driven approach to
run the integration tests.

Here is AWS' best practice on testing Lambda:
[How to test serverless functions and applications](https://docs.aws.amazon.com/lambda/latest/dg/testing-guide.html).

## Reference projects I have built

It's always best to look at actual code, so these are the open-source projects
that are available which I have worked on:

- <https://github.com/hello-nrfcloud/backend>
- <https://github.com/hello-nrfcloud/map-backend>
- <https://github.com/NordicSemiconductor/asset-tracker-cloud-aws-js>
- <https://github.com/NordicPlayground/thingy-rocks-cloud-aws-js>
- <https://github.com/teamstatus/aws-backend>
