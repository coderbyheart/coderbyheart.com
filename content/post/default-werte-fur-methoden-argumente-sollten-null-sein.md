---
title: >-
  Default-Werte für Methoden-Argumente sollten null sein
abstract: |
  Oft genug sieht man Methodendefinitionen mit Standardwerten für Argumente, da viele Programmiersprachen das Überladen von Methoden, wie z.B. in Java, nicht unterstützen.
date: 2011-08-04T00:00:00.000Z
---

Oft genug sieht man Methodendefinitionen mit Standardwerten für Argumente, da
viele Programmiersprachen das Überladen von Methoden, wie z.B. in Java, nicht
unterstützen.

Ein einfaches Beispiel einer Methode mit zwei optionalen Argumenten:  
`function connect($host, $port = 1234, $timeout = 60) { ... }`

Möchte man nun diese Methode verwenden, und den letzten der beiden Parameter
überschreiben, ist man gezwungen, auch den zweiten an zu geben,  
`connect('server', 1234, 10);`

Eigentlich meint man aber  
`connect('server', {default}, 10);`

Und genau hier liegt das Problem: das Übernehmen des Standardwertes aus der
Definition führt dazu, dass _bei einer Änderung des Standardwertes_ sich diese
Änderung nicht auf den Teil des Codes auswirkt, in dem die Methode aufgerufen
wird &mdash; obwohl das eigentlich das Verhalten ist, dass der Verwender
erwartet hätte.

Deswegen sollten Standardwerte immer mit `null` definiert werden:

    function connect($host, $port = null, $timeout = null) {
        if ($port === null) $port = 1234;
        if ($timeout === null) $timeout = 10;
        ...
    }

So muss der Aufrufer Standardwerten nur Beachtung schenken, wenn er sie explizit
überschreiben will. Ansonsten kann er einfach `null` übergeben:  
`connect('server', null, 10);`

Übrigens hat Python, in dem das Überladen von Methoden nicht unterstützt wird,
eine clevere Lösung dafür: beim Aufrufen einer Methode [kann man die Argumente
explizit mit ihrem Namen ansprechen][1].

[1]: http://docs.python.org/tutorial/controlflow.html#keyword-arguments
