---
subtitle: Book review
title: REST in Practice - a reading guide
abstract:
  While the book was published in 2010 and some of its contents have not aged
  well, it still provides a lot of things to learn. In this post I will give my
  recommendations on which sections are a must read, and which ones can be
  skipped in case you are-like me-not very fond of Java adn XML.
date: 2022-07-16T16:00:00.000Z
---

![REST in Practice cover](../media/rest-in-practice.jpeg)

It has been a while, probably more than 10 years, since I first read
[REST in Practice](https://restinpractice.com/) and it greatly influenced the
way I design web application backends. It gave me a universal toolkit (HTTP) to
build decoupled microservice architectures, and I am convinced that I even today
many of the learnings I got from reading the book for the first time.

For this reason I also highly recommend this book
([amongst others](https://github.com/coderbyheart/first-principles/issues/19))
as a must read in my talks and to whomever asks for a book recommendation on
software architecture.

Since this year I am in the lucky situation to grow my team that and having
recently hired a Junior engineer, REST in Practice is one of the first books I
ordered.

This is a good opportunity to give it a second read, and review it from the
point of view of a team that develops software using serverless technologies, in
TypeScript on Node.js and provide a reading guide for them that helps to
navigate the book some of the outdated sections. I will also highlight
especially important chapters.

> By the way: I am also looking for a
> [Senior Cloud Engineer](https://candidate.hr-manager.net/ApplicationInit.aspx?cid=278&ProjectId=177136&DepartmentId=7414&MediaId=5&SkipAdvertisement=False)!

## Still highly relevant

Overall, the sentiment of the book still holds very true today. We need to build
resilient, decoupled systems that can handle unpredictable load patterns. The
book does a very good job of showing how all of this can be achieved with a
ubiquitous communication protocol: HTTP. This principle is truly language- and
platform-neutral which makes it so unversally applicable.

## Reading guide

This is my recommended reading guide for the book:

1. Chapter 12 - Building the Case for the Web (p. 407):  
   this is the _tl;dr_ of the book, and it gives a good summary of _why_ the
   techniques explained in the book work so well.
1. Chapter 1 - The Web As a Platform for Building Distributed Systems:  
   read fully
1. Chapter 2 - Introducing Restbucks: How to GET a Coffee, Web Style:  
   read fully
1. Chapter 3 - Basic Web Integration:  
   skip URI tunnelling and POX (p. 37-55)
1. Chapter 4 - CRUD Web Services:  
   read fully, important chapter on how to properly employ HTTP for building
   APIs
1. Chapter 5 - Hypermedia Services:  
   read full! This is also an important chapter on how to make services
   discoverable. While the use of XML is quite clunky for a Node.js developer,
   it does not get too much in the way of the content that explains the main
   idea. After this chapter we could have a look at
   [JSON-LD](https://json-ld.org/).
1. Chapter 6 - Scaling Out:  
   ready fully, important chapter on the usefullness of caching and how to use
   cached response to reduce latency and infrastructure costs.
1. Chapter 7 - The Atom Syndication Format:  
   good explanation of how to decouple microservices and allow consuming
   services to observe changes. Skip the Java implementation part (p.207-234).
   Missing in this chapter is a push notification capability. The communication
   relies on consumers to poll for changes, and this is very inefficient.
   Microservices should publish events in a way that allows consumers to react
   to these changes when they happen, but only IF they happen. This is possible
   in HTTP with websockets and should be discussed after reading this chapter.
1. Chapter 8 - Atom Publishing Protocol:  
   read, but skip the implementation guide (p. 269-283). It's a lot of XML
   that's thrown at the reader but the underlying idea is still worth exploring:
   we want a language-independent way to describe which actions a service
   provides. The authors pick AtomPub as a general purpose syntax. After this
   chapter we could have a look at
   [Hydra](https://www.markus-lanthaler.com/hydra/) or
   [Apache Thrift](https://thrift.apache.org/).
1. Chapter 9 - Web Security:  
   read, but skip the OpenID and OAuth part (p. 295-339) because they are often
   not relevant in machine-to-machine scenarios. The first and the last pages of
   the chapter however are a good refresher on HTTP security essentials.
1. Chapter 10 - Semantics:  
   Optional. Be aware that the solutions proposed are quite outdated, but we
   face the main question today nevertheless: How can we build a ubiquitous
   languages into our systems that transcends the boundaries of our business. I
   haven't seen this to be really relevant in my day to day job.
1. Chapter 11 - The Web and and WS-\*:  
   Skip. This is a discussion around specific technologies which is only
   relevent to people who use them; which we are not.
