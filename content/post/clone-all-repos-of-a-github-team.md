---
title: Clone all repositories of a GitHub team
subtitle: snippets
abstract: This is a small snipped that clones all repositories of a GitHub team
date: "2022-11-01T13:00:00+01:00"
---

First, ensure you have your GitHub token available. If you are using a `.netrc`,
you can acquire it from there:

```bash
GITHUB_TOKEN=`cat ~/.netrc | grep 'machine github.com' | awk '{ print $6; }'`
```

Then, using the organization name and team slug, clone all repositories:

```bash
ORG=my-org
TEAM=my-team
http https://api.github.com/orgs/${ORG}/teams/${TEAM}/repos\?per_page\=100 \
    Authorization:"token ${GITHUB_TOKEN}" | jq '.[].clone_url' | xargs -I@ git clone @ --depth 1
```
