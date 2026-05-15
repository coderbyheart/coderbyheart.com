---
title: >-
  Die Browserkompatibilitätsklausel
abstract: >-
  Wenn man in der glücklichen Situation ist, ein Angebot zu schreiben, ist
  dessen Basis in der Regel auch eine möglichst genaue Beschreibung über den
  Umfang des Auftrags, im Allgemeinen Pflichtenheft genannt.
date: 2011-10-09T00:00:00.000Z
lang: de
---

Wenn man in der glücklichen Situation ist, ein Angebot zu schreiben, ist dessen
Basis in der Regel auch eine möglichst genaue Beschreibung über den Umfang des
Auftrags, im Allgemeinen _Pflichtenheft_ genannt.

Die Ausformulierung ist dabei entscheidend um im Fall von
Meinungsverschiedenheiten klar bestimmen zu können, welche Partei Recht hat.
Speziell bei Software kann aber die Beschreibung von Funktionen oft nicht exakt
erfolgen — läuft die Software in einem vorher nicht genau bekannten Umfeld
trifft man unweigerlich auf dieses Problem.

Die Regel ist das bei Anwendungen, die im Webbrowser dargestellt werden. Die
Vielzahl existierender Browser und Platformen macht es praktisch unmöglich, die
exakte Darstellung in verschiedenen Browsern **zu garantieren**. Dieser Umstand
ist allgemein akzeptiert und inzwischen existiert das Bewußtsein dafür auch auf
Kundenseite.

Wie aber formuliert man solche “Ungenauigkeiten” möglichst _genau_?

Den folgenden Absatz verwende ich in Pflichtenheften.

> Browser-Unterstützung
>
> Unterstützt werden:
>
> - Internet-Explorer 7-9
> - Firefox 3.6-6
> - Safari 5
>
> Browser-Unterstützung, der aufgelisteten Browser und Versionen, bedeutet, dass
> die volle Funktionalität der Anwendung in diesen Browsern gewährleistet ist.
> Eine pixelgenaue, identische Darstellung in allen Browsern und unter allen
> Plattformen kann nicht gewährleistet werden, jedoch wird eine, im Sinne der
> Gestaltung und aus Sicht des Benutzers, fehlerfreie Darstellung angestrebt.
>
> Eine Plattform ist ein Computer, Smartphone, Spielekonsole etc.

Die Wahl der Browser und Versionen ist dabei natürlich an das jeweilige Projekt
angepasst. Als Faustregel sollte man die Browserversionen unterstützen, die in
den Webserverstatistiken der Website (falls vorhanden) von mehr als 3% der
Besucher verwendet werden — eine Ausnahme ist hier der IE6, eine Unterstützung
für diesen Browser sollte in der Aufwandsschätzung für die Umsetzung in HTML und
JS mit einem Aufschlag von 30% berücksichtigt werden.

Wichtig ist noch, dass man auf keinen Fall eine Aufwärtskompatibilität
garantieren darf, z.B. mit Formulierungen wie “IE 9+”, dies führt zu
unkalkulierbaren Aufwänden, und der Kunde hat den Eindruck, dass seine Website
auch noch in 10 Jahren einwandfrei funktionieren wird.
