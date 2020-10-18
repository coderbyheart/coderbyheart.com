---
title: >-
  Passwörter für SSH-Keys in der Konsole merken
abstract: |
  Um sich die wiederkehrende Passwort-Abfragen für SSH-Keys auf der Konsole zu sparen, führt man folgende Kommandos aus:
date: 2010-05-15
---

Um sich die wiederkehrende Passwort-Abfragen für SSH-Keys auf der Konsole zu
sparen, führt man folgende Kommandos aus:

    eval "$(/usr/bin/ssh-agent -s)"
    ssh-add -L

Das startet den SSh-Key-Agent und damit ist das Passwort des Keys für die
aktuelle Sitzung gespeichert und wird nicht mehr abgefragt.
