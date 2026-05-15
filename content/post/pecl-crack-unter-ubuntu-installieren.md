---
title: >-
  PECL crack unter Ubuntu installieren
abstract: |
  Auch die PECL Erweiterung crack muss erst überredet werden, sich auf Ubuntu zur Verfügung zu stellen, da beim Installieren folgender Fehler auftritt:
date: 2010-05-29T00:00:00.000Z
---

Auch die PECL Erweiterung [crack][1] muss erst überredet werden, sich auf Ubuntu
zur Verfügung zu stellen, da beim Installieren folgender Fehler auftritt:

    /tmp/pear/temp/crack/libcrack/src/config.h:1:26: error: ../../config.h: No such file or directory
    make: *** [crack.lo] Error 1
    ERROR: `make' failed

Die Lösung ist die manuelle Installation.

    apt-get install cracklib2-dev cracklib-runtime
    cd /opt
    svn co http://svn.php.net/repository/pecl/crack/trunk pecl-crack-svn
    cd pecl-crack-svn

Die Datei `libcrack/src/cracklib.h` editieren:

    -# include "../../config.h"
    +# include "../config.h"

Die Datei `package.xml` editieren:

    -          <file role="src" name="config.h" />

Und dann manuell installieren:

    pecl install --force package.xml
    echo "extension=crack.so" > /etc/php/conf.d/crack.ini
    /etc/init.d/apache2 restart

[1]: http://pecl.php.net/package/crack
