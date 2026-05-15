---
title: >-
  Zugriffe nach Host sortiert aus Apache`s Access Log auslesen
abstract: |
  Dieses kleine Bash-Kommando listet die Zugriffe in einer bestimmten Zeit (20/Oct/2008:21 = am 20. Oktober 2008 zwischen 21:00:00 und 21:56:59) und sortiert diese nach Häufigkeit.
date: 2010-05-10T00:00:00.000Z
---

Dieses kleine Bash-Kommando listet die Zugriffe in einer bestimmten Zeit
(`20/Oct/2008:21` = am 20. Oktober 2008 zwischen 21:00:00 und 21:56:59) und
sortiert diese nach Häufigkeit.

    cat access_log | grep "20/Oct/2008:21" | awk '{ print $1; }' | sort | uniq -c | sort | tail

Beispiel:

      2 66.249.71.205
      2 83.7.105.44
      2 88.80.205.184
      3 38.113.234.180
      3 93.158.151.25
      4 72.14.199.10
      6 72.30.142.245
     24 67.195.37.90
     48 85.180.64.152
     57 80.109.85.214
