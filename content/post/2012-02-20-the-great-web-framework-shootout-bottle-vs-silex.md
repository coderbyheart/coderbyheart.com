---
title: >-
  The Great Web Framework Shootout: Bottle vs. Silex
abstract: |
  Frameworks zu vergleichen ist immer eine schlechte Idee, zu viele Faktoren spielen bei der Wahl eines Frameworks eine Rolle, als dass man sich rein auf quantitative Aussagen wie Anfragen pro Sekunde, Zeilen Quellcode oder die geschlossenen Bugs pro Monat verlassen darf.
date: 2012-02-20
---

Frameworks zu vergleichen ist immer eine schlechte Idee, zu viele Faktoren
spielen bei der Wahl eines Frameworks eine Rolle, als dass man sich rein auf
quantitative Aussagen wie Anfragen pro Sekunde, Zeilen Quellcode oder die
geschlossenen Bugs pro Monat verlassen darf.

Trotzdem ist sind diese Vergleiche immer wieder faszinierend. Gestern bin ich
über [The Great Web Framework Shootout][1] gestolpert. Bei diesem Test werden
mit Frameworks drei einfache „Hello World!“-Seiten umgesetzt: einmal als
statische Antwort, einmal mithilfe einer Template-Engine und einmal mit Daten
aus einer kleinen SQLite-Datenbank. Gemessen wird die jeweilige Antwortzeit der
Frameworks bei diesen drei Seiten.

Was mich bei den dort gezeigten Zahlen extrem stutzig gemacht hat, war das
miserable Abschneiden der PHP-Frameworks und besonders von Symfony2, obwohl der
Tester darauf geachtet hat, APC zu aktivieren. Um diese Zahlen zu
verifizieren habe ich einen eigenen Test mit [Silex][2] (dem kleinen Bruder von
[Symfony2][3]) aufgesetzt. Den Quellcode dazu findet sich in [diesem
Pull-Request][4]. Da ich inzwischen auch ein großer Fan von Python bin und sich
zudem noch die Philosophie von [Bottle][5] und Silex sehr ähneln, habe ich
dieses Framework zum Vergleich genommen. Beide Frameworks sind als Virtual Host
konfiguriert, und werden mit Apache Bench *ab -n 10000 -c 10* aufgerufen. Die
Ergebnisse sprechen für sich. Mit Templating-Engine und Datenbank-Zugriff
liefert Bottle 16.632 Anfragen pro Sekunde aus, Silex lediglich 378.

<img src="https://docs.google.com/spreadsheet/oimg?key=0AtTPpgm7INxMdFVhamJOZ0N5YzVtMW80TEx2akljdEE&#038;oid=1&#038;zx=1joaj0cdr67a" alt="The Great Web Framework Shootout: Bottle vs. Silex" width="480" />

_Micro_ bedeutet also nicht immer hohe Geschwindigkeit.

[1]: http://blog.curiasolutions.com/the-great-web-framework-shootout/
[2]: http://silex.sensiolabs.org/
[3]: http://symfony.com/
[4]: https://github.com/seedifferently/the-great-web-framework-shootout/pull/15
[5]: http://bottlepy.org/docs/dev/
