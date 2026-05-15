---
title: >-
  Autoload environment variables
abstract: >-
  When developing stateless microservices it can be tedious to set up the
  correct environment variables. You can teach your bash/zsh to load them on a
  per directory basis.
date: 2016-04-07T00:00:00.000Z
---

When developing stateless microservices it can be tedious to set up the correct
environment variables. You can teach your bash/zsh to load them on a per
directory basis.

If you add this to your `.bashrc` or `.zshrc.local` environment variables will
be set from a file called `.env` if it is present in the directory you are
cd-ing into:

    function readEnv
    {
            if [ -f $PWD/.env ]
            then
                    cat $PWD/.env
                    export $(cat $PWD/.env | xargs)
            fi
    }

    cd()
    {
            builtin cd "$@"
            readEnv
    }
    readEnv

In my project directory I have a `.env` file with these contents:

    export MY_FOO_ENV=bar
    echo MY_FOO_ENV=$MY_FOO_ENV

Now everytime I run my project the correct environment is set.
