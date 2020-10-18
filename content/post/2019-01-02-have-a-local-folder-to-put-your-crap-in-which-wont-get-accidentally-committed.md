---
title: >-
  Have a local folder to put your crap in which won't get accidentally committed
subtitle: >-
  Devhacks
abstract: |
  Do you always have temp / scratch files lying around in your Git repo and sometimes accidentally commit them (like I do)? Here is a simple fix!
date: 2019-01-02
---

![Sleeping Red Panda in the Barcelona Zoo](../media/2019-01-02-have-a-local-folder-to-put-your-crap-in-which-wont-get-accidentally-committed.jpg)

Do you always have temp / scratch files lying around in your Git repo and
sometimes accidentally commit them (like I do)?

Add `local/` to your global gitignore file and now you have a place where you
can put your not-so-temp files and they won't bother you ever again when you use
a `git add -A`.

You can define a global `.gitignore` in your global git config file:

    #  ~/.gitconfig
    [core]
            excludesfile = ~/.gitignore_global

And in the [`excludesfile`](https://git-scm.com/docs/gitignore/1.7.12) add a
line for the `local/` folder:

    #  ~/.gitignore_global
    local/
