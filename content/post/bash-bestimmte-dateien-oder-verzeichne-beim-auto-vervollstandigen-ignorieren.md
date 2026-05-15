---
title: >-
  Bash: Bestimmte Dateien oder Verzeichnisse beim Auto-Vervollständigen
  ignorieren
abstract: |
  Die Bash hat eine tolle Funktion: Mittels der Tab-Taste erhält man eine Liste mit Dateien und Verzeichnissem im aktuell eingegeben Pfad-Abschnitt.
date: 2010-09-28T00:00:00.000Z
---

Die Bash hat eine tolle Funktion: Mittels der Tab-Taste erhält man eine Liste
mit Dateien und Verzeichnissem im aktuell eingegeben Pfad-Abschnitt.

Allerdings nerven da z.B. Verzeichnisse wie `.svn` von Subversion, in die man
normalerweise nie hinein navigieren möchte.

Zu Hilfe kommt da die Umgebungsvariable `FIGNORE`.

> A  colon-separated  list  of  suffixes to ignore when performing filename
> completion (see READLINE below).  A filename whose suffix  matches  one of the
> entries in FIGNORE is excluded from the list of matched filenames.  A sample
> value is `.o:~`.

Ein praktischer Eintrag für Subversion ist dementsprechend: `.svn`. Unter Mac OS
bietet sich noch an, `.DS_Store` hinzu zu nehmen.

Diese Zeile wird dann in der Datei `˜/.profile` oder ähnlich eingetragen:

`export FIGNORE=".svn:.DS_Store"`
