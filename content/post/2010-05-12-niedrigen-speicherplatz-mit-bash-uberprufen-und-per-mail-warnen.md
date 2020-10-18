---
title: >-
  Niedrigen Speicherplatz mit Bash überprüfen und per Mail warnen
abstract: |
  Dieses kleine Bash-Script, versendet als Cronjob eingetragen, E-Mails an den root-User, wenn der Plattenplatz auf allen gemounteten /dev/hd*-Platten weniger als 1 GB beträgt.
date: 2010-05-12
---

Dieses kleine Bash-Script, versendet als Cronjob eingetragen, E-Mails an den
root-User, wenn der Plattenplatz auf allen gemounteten `/dev/hd*`-Platten
weniger als 1 GB beträgt.

    for i in `df | grep "/dev/hd" | grep -e "[a-z]$" | awk '{ print $4; }'`; do if [[ $i -gt 999999 ]]; then df -h | mail root -s "Low diskspace warning for `hostname -f`"; break; fi; done
