---
title: >-
  Rotate screen in Linux
abstract: |
  Sometimes it can be useful to rotate a screen, e.g. to have one display in portrait. This command will rotate your screen:
date: 2016-04-19T00:00:00.000Z
---

Sometimes it can be useful to rotate a screen, e.g. to have one display in
portrait. This command will rotate your screen:

    # find the name of your actual output (in this example DVI-I-3) with this command
    xrandr --listmonitors
    # Apply rotation
    xrandr --output DVI-I-3 --rotate left
