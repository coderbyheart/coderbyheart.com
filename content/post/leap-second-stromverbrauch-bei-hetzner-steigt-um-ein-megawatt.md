---
title: >-
  Leap second: Stromverbrauch bei Hetzner steigt um ein Megawatt
abstract: |
  So schreibt es Hetzner gerade in einer E-Mail an seine Kunden.
date: 2012-07-03T00:00:00.000Z
---

So schreibt es Hetzner gerade in einer E-Mail an seine Kunden.

> in der Nacht vom 30.06.2012 auf den 01.07.2012 registrierten unsere internen
> Überwachungssysteme einen Anstieg des IT-Stromverbrauchs **um etwa ein
> Megawatt**.
>
> Grund für den enormen Anstieg ist die zusätzliche geschaltene
> [Extrasekunde][1], die auf Linux-Rechnern zu dauerhafter CPU-Auslastung führen
> kann.
>
> Laut [heise.de][2] sind diverse Linux-Distributionen davon betroffen.
>
> Um die CPU-Auslastung wieder auf ein normales Maß zu reduzieren **ist in
> vielen Fällen ein Neustart des gesamten Systems notwendig**. Im ersten Schritt
> sollten Sie dazu einen Soft-Reboot über die Kommandozeile versuchen. Sofern
> diese Maßnahme nicht greift, steht Ihnen noch die Möglichkeit eines
> Hardware-Resets über die Administrationsoberfläche Robot zur Verfügung. Wählen
> Sie dazu in der Administrationsoberfläche den Menüpunkt 'Server' sowie den
> Reiter 'Reset' des jeweiligen Servers.

Auf meinem Server war die Java VM betroffen, in der eine Jenkins-Instanz lief.
Selbst nach dem Töten aller Java-Prozesse und anschließendem Start von Jenkins
verbrauchte dieser weiterhin 80-90% der CPU-Zeit. Erst ein Neustart des Servers
brachte alles wieder in Normalzustand.

[1]:
  http://www.heise.de/newsticker/meldung/Schaltsekunde-Verlaengertes-Wochenende-1629612.html
[2]:
  http://www.heise.de/newsticker/meldung/Schaltsekunde-Linux-kann-einfrieren-1629683.html
