---
title: >-
  PECL OAuth 0.99.9 unter Gentoo installieren
abstract: |
  Da einige der Maschinen, mit denen ich arbeite noch (aktuelle) Gentoo-System sind, gibt es immer wieder Probleme, die Gentoo-spezifisch sind, und damit oft auch nervig.
date: 2010-05-28T00:00:00.000Z
---

Da einige der Maschinen, mit denen ich arbeite noch (aktuelle) Gentoo-System
sind, gibt es immer wieder Probleme, die Gentoo-spezifisch sind, und damit oft
auch nervig.

Aktuelles Beispiel ist die fehlschlagende Installation von [PECL OAuth][1]:

    pecl install oauth-beta
    `

    libtool: Version mismatch error.  This is libtool 2.2.6b, but the
    libtool: definition of this LT_INIT comes from an older release.
    libtool: You should recreate aclocal.m4 with macros from libtool 2.2.6b
    libtool: and run autoconf again.
    make: \*** [oauth.lo] Error 63
    ERROR: \`make` failed

Abhilfe schafft das nur das manuelle Installieren:

    wget http://pecl.php.net/get/oauth-0.99.9.tgz
    tar xvzf oauth-0.99.9.tgz
    cd oauth-0.99.9
    phpize && aclocal && autoheader && autocon
    ./configure
    make
    make install
    echo 'extension=oauth.so' /etc/php/cli-php5/ext/oauth.ini
    ln -s /etc/php/cli-php5/ext/oauth.ini /etc/php/cli-php5/ext-active/oauth.ini
    echo 'extension=oauth.so' /etc/php/apache2-php5/ext/oauth.ini
    ln -s /etc/php/apache2-php5/ext/oauth.ini /etc/php/apache2-php5/ext-active/oauth.ini

[1]: http://pecl.php.net/package/oauth
