---
title: >-
  Encrypt Login Links
abstract: |
  Encrypt login links with the users public PGP key to add a simple but effective layer of security with only a small usability impact.
date: 2015-01-03T16:40:00.000Z
---

I believe that logging into a web based application using a username and a
password should be abolished. _If you want to learn more about the advantages of
password-less logins, [read this article][1]._

If you implement a password-less login, your users will receive a login link in
ther email inbox which will be valid for some time.

Unfortunately this creates a potential attack surface as anyone who has access
to the user's mailbox or can intercept unecrypted communication of the users
email client with their mailserver can use the link to access their account.
There are various options to ensure that an attacker can do nothing harmful with
the access to a users account (like creating extra out-of-band challenges for
dangerious account modifications) but there exists an easy one: **encrypt the
login link with the users public PGP key**.

If a user knows how to handle PGP you should provide an option in the
application's dashboard to provide his public PGP key for his account. Make sure
you verify this key bevore using it, though. Once enabled this adds a simple but
effective layer of security with only a small usability impact.

[1]: http://notes.xoxco.com/post/27999787765/is-it-time-for-password-less-login
