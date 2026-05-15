---
title: >-
  Intents auf Android testen
abstract: |
  Mit der adb shell ist es einfach möglich das Handling von Intents zu testen ` sehr praktisch, wenn man z.B. in der App normalerweise einen QR-Code-Scanner verwendet, um eine URL zu erhalten.
date: 2012-01-26T00:00:00.000Z
---

Mit der adb shell ist es einfach möglich das Handling von Intents zu testen `
sehr praktisch, wenn man z.B. in der App normalerweise einen QR-Code-Scanner
verwendet, um eine URL zu erhalten.

Das Kommando

`adb shell am start -a android.intent.action.VIEW -d 'http://www.google.de'`

öffnet z.B. den Browser.
