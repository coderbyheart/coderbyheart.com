---
title: >-
  Schneller Syntax-Check für modifizierte PHP-Dateien
abstract: |
  Ja, manchmal muss man halt via SSH auf Maschinen rumhacken, auf denen es kein vernünftiges Error-Reporting gibt. Und wenn dann die Seite weiß bleibt, hilft dieses Kommando, um heraus zur finden, welche der Dateien man zerschossen hat:
date: 2011-01-20
---

Ja, manchmal muss man halt via SSH auf Maschinen rumhacken, auf denen es kein
vernünftiges Error-Reporting gibt. Und wenn dann die Seite weiß bleibt, hilft
dieses Kommando, um heraus zur finden, welche der Dateien man zerschossen hat:

`svn status | grep "\.php$" | grep "^M" | awk '{ print $2; }' | xargs -i php -l {}`

Das `svn status` am Anfang verrät schon, zumindest über eine SVN working copy zu
verfügen ist dabei äußerst hilfreich.

Die Alternative dazu, ohne SVN ist

` find ./ -type f -name "*.php" | xargs -i php -l {}`

was aber natürlich sehr viel langsamer ist.
