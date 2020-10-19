---
title: >-
  duplicity Fehler &#8220;IOError: GnuPG exited non-zero, with code 2&#8243;
  unter Ubuntu beheben
abstract: |
  Zum Sichern von Daten auf FTP-Server bietet sich duplicity. Es bietet, ähnlich wie rdiff-backup, die Möglichkeit, volle und inkrementelle Backups zu erzeugen, aber im Gegensatz zu rdiff-Backup eben auf FTP-Server und noch dazu verschlüsselt.
date: 2010-05-09T00:00:00.000Z
---

Zum Sichern von Daten auf FTP-Server bietet sich [duplicity][1]. Es bietet,
ähnlich wie [rdiff-backup][2], die Möglichkeit, volle und inkrementelle Backups
zu erzeugen, aber im Gegensatz zu rdiff-Backup eben auf FTP-Server und noch dazu
verschlüsselt.

Allerdings hat die Version in Ubuntu 9.04 (Jaunty Jackalope) einen Bug, der
bewirkt, dass duplicity mit folgender Fehlermeldung den Dienst quittiert:

    IOError: GnuPG exited non-zero, with code 2

Das lässt sich relativ einfach beheben: duplicity manuell installieren.

Dazu geht man wie folgt vor:

Ubuntu&#8217;s duplicity entfernen:

    aptitude purge duplicity

python-dev und librsync-dev werden zum kompilieren von duplicity benötigt:

    aptitude install python-dev librsync-dev

Die aktuelle Version herunterladen und installieren

    cd /opt
    wget http://code.launchpad.net/duplicity/0.6-series/0.6.08b/+download/duplicity-0.6.08b.tar.gz
    tar xvzf duplicity-0.6.08b.tar.gz
    cd duplicity-0.6.08b
    python setup.py install

Nun ist duplicity installiert.

Tritt der Fehler auf, nachdem bereits eine Weile das Backup problemlos
funktioniert hat, muss man die alten Dateien leider entsorgen und mit einem
neuen Full-Backup starten.

[1]: http://duplicity.nongnu.org/
[2]: http://rdiff-backup.nongnu.org/
