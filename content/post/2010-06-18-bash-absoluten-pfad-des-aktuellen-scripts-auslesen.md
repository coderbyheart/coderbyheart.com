---
title: >-
  Bash: Absoluten Pfad des aktuellen Scripts auslesen
abstract: |
  Oft ruft man Bash-Scripte ja mit relativen Pfaden auf:
date: 2010-06-18
---

Oft ruft man Bash-Scripte ja mit relativen Pfaden auf:

    $ ./util.sh

Dieses kleine Snippet liefert einem in diesem Fall den absoluten Pfad zum
aktuellen Script.

    #!/bin/bash
    MYDIR="`cd $0; pwd`"
    echo $MYDIR

Möchte man den absoluten Pfad zu einem Verzeichnis weiter oben, nimmt man dieses
Snippet:

    #!/bin/bash
    MYDIR=`dirname $0`
    PARENT="`cd $MYDIR/../; pwd`"
