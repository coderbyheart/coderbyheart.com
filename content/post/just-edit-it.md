---
title: >-
  Just edit it!
abstract: |
  We need tools not protocols for editing content on the web.
  In my first article I barely scratched the surface of what is missing to encourage collaboration on public available data. In this article I’d like to share my view of what is missing.
date: 2013-08-23T00:00:00.000Z
---

## We need tools not protocols for editing content on the web.

In [my first article](./i-cannot-edit-that) I barely scratched the surface of
what is missing to encourage collaboration on public available data. In this
article I’d like to share my view of what is missing.

I have a publicized a list of technology user groups from my area at
[usergroups.rheinmainrocks.de](http://usergroups.rheinmainrocks.de/). The list
is driven by a collection of XML files describing each group. The XML files are
hosted in a [GIT repository at GitHub](https://github.com/tacker/ugrm-data).
They can be edited by everybody.

## Everybody can edit public on GitHub already. _Everybody?_

Well, at least if he is accustomed to the git pull request workflow, the file
format in place, can speak english (as this is GitHubs only interface language),
has an account on github.com.

If I want every member of my audience to enhance my collection of data about
usergroups—GitHub pull requests on XML files would not be the choice. I picked
it because it is easy to manage. From a contributors point of view another
approach would be much more feasable: fill in some kind of form and be done with
it.

## Look Ma! No login!

Yes, I am talking about anonymous submissions. I can decide on the submitted
data if it fits into my context. Author information is nice to have but not
required.

**I really don’t care who is submitting information—_the information is what
matters_.**

To encourage contributions to data the process must be as easy as ordering
something from amazon: straight forward and self explanatory. But the tools we
have at the moment are fare from that. In my industry we call the content
management systems. And the emphasis is on management and system. Those are
beasts in terms of functionality and versatility which is achieved by throwing
massive collections of buttons and input elements at the users without any
explanation. For every CMS you need not only the vendors handbook, but an
instruction on how to use the system for the specific site it was adapted for.

## Admin areas must vanish!

Admin areas—the thing behind the username and password fields—are designed for
users to edit content. If the content for every website can easily be classified
into a few—text, lists, links, images—why must there be a custom way to edit
these in every CMS?

**It is these admin areas which function as a blocker for contributions.**

If we could establish an easy to use and standardized way to orchestrate the
editing, review and approval of content on the web we could focus on publishing
content instead of setting up systems for its management.

## Protocols are for machines

There is a
protocol—[AtomPup](http://bitworking.org/projects/atom/rfc5023.html)—which
enables the collaboration on arbitrary data in a system neutral way. This is
achieved by defining a set of actions—known as the CRUD operations—and
strategies to handle conflicts. It is a robust and universally approach but it
lacks an important aspect: it does not care about the data to be edited. For the
scope of the protocol this is the right approach. There is no need to care about
the data—AtomPub is just a messenger. The implementation of the content editing
is left to the user and he is forced to acquire the suitable tools.

## Adding constraints adds to our goal

Just add some constraints and we could push this further into a general way for
editing arbitrary data where we can make assumptions about the data itself!

If we could describe the contents of web pages in just a few content types we
would could provide a service which enables the edition of the data
instantly—and like GitHub does—in the browser.

I think we can!
