---
title: >-
  MacBook Funktionstasten unter Linux
abstract: >-
  Diese sind, zumindest unter Arch Linux, standardmäßig nur mittels FN+F zum
  auslösen zu bewegen.
date: 2011-04-13T00:00:00.000Z
---

Diese sind, zumindest unter Arch Linux, standardmäßig nur mittels
FN+F&lt;1..12&gt; zum auslösen zu bewegen.

Dieser Eintrag in der `/etc/modprobe.d/modprobe.conf` behebt das Problem:

`options hid_apple fnmode=2`
