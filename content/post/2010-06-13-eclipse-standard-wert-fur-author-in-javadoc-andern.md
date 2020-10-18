---
title: >-
  Eclipse: Standard-Wert für @author in JavaDoc ändern
abstract: |
  Der Standard-Werte für den @author-Tag in JavaDoc ist der Username des Accounts, der Eclipse gestartet hat.
date: 2010-06-13
---

Der Standard-Werte für den `@author`-Tag in JavaDoc ist der Username des
Accounts, der Eclipse gestartet hat.

Dies lässt sich einfach überschreiben, in dem man in der
[eclipse.ini](http://wiki.eclipse.org/Eclipse.ini), die sich im Programm-Ordner
von eclipse findet, diese Zeile einfügt:

    -Duser.name=Some User <someuser@example.com>
