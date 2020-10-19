---
title: Meine .subversion/config
date: 2010-10-14T00:00:00.000Z
---

    [helpers]
    diff-cmd = colordiff
    diff-args = --ignore-all-space --ignore-blank-lines
    [miscellany]
    enable-auto-props = yes
    [auto-props]
    * = svn:keywords=Id Rev
    [auth]
    # Verhindert die Verwendung von Keychain / Keyring
    password-stores =
