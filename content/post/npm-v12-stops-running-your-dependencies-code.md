---
title: npm 12 stops running your dependencies' code
subtitle: Best practice
abstract: >-
  Almost every recent npm supply chain attack has used the same delivery
  mechanism: a compromised package ships an install script, and `npm install`
  runs it. npm 12 turns that off by default.
date: 2026-07-30T09:00:00+02:00
---

> **tl;dr** [npm 12](https://github.com/npm/cli/releases/tag/v12.0.0) makes
> dependency lifecycle scripts, Git dependencies, and remote tarballs opt-in.
> Run `npm approve-scripts --allow-scripts-pending`, approve what you trust,
> commit the allowlist.

The attacks all look the same. Someone steals a publish token, pushes a patch
release with a `postinstall` script, and every CI runner that installs within
the hour executes it with whatever credentials that runner holds. The _contents_
of the package barely matter. The execution is the payload.

[npm 12](https://github.com/npm/cli/releases/tag/v12.0.0), released on 8 July
2026, ends that as a default. I consider it the most important thing to happen
to the npm CLI in years.

## What is opt-in now

1. **`allowScripts` defaults to off.** `preinstall`, `install`, and
   `postinstall` from dependencies no longer run. Neither do implicit `node-gyp`
   builds — a package with a `binding.gyp` and no declared install script is
   blocked too. `prepare` scripts from git, file, and link dependencies go the
   same way.
1. **`--allow-git` defaults to `none`**, direct or transitive. The reason should
   make you sit up: a Git dependency's `.npmrc` could override the Git
   executable, and that worked _even with `--ignore-scripts`_. The flag we all
   reached for was never the boundary we thought it was.
1. **`--allow-remote` defaults to `none`.** No more https tarballs pulled in as
   transitive dependencies. `--allow-file` and `--allow-directory` are
   unchanged.

## The allowlist is the actual security control

```bash
npm approve-scripts --allow-scripts-pending
npm approve-scripts
npm deny-scripts
```

The allowlist is written into your `package.json`, and you commit it. That is
the part that matters: "which of our dependencies may execute code on our build
agents" stops being an assumption and becomes a reviewable diff. The next time a
compromised release adds a `postinstall`, someone has to approve it in a pull
request first.

The first `npm ci` after the upgrade will fail, loudly, and native dependencies
will break first. Make sure to read the error before running it again with
`--allow-scripts`.

## Two smaller doors, also closed

- **`npm shrinkwrap` is gone.** `npm-shrinkwrap.json` is no longer honored —
  including from _inside dependency tarballs_, where a dependency could
  previously dictate part of your resolved tree. npm 11.17.0 also shipped a fix
  to
  [reject path traversal entries when inflating dependency shrinkwraps](https://github.com/npm/cli/pull/9451),
  which tells you what kind of neighbourhood this feature lived in.
- **Unknown configs now throw.** Until npm 12, `ignore-scipts=true` in a CI
  `.npmrc` did nothing, silently, forever — a security control that only existed
  in your head. Now it fails the build. Misconfigured guardrails should be loud.

## Side note: move to trusted publishing

Since a stolen token is how this starts, npm is deprecating 2FA-bypass granular
access tokens in the same breath. From early August 2026 they can no longer
change account, package, or organization settings; around January 2027 they lose
direct publish entirely. I have been migrating CI publishing to
[trusted publishing](https://docs.npmjs.com/trusted-publishers) for a few months
now&mdash;it is a quick change.

## None of this applies if you are still running npm 11

Everything above is a property of the npm binary that happens to be running, not
of your repository. `engines` in `package.json` is a _recommendation_: npm
prints a warning and installs anyway. So pin the version, and make the install
fail when the pin is not met. This is what I
[did in this project](https://github.com/fjordcleanup/badeplasser/commit/3a597fb697f890261b440e389c8250c3a488ccf1):

```json
{
  "engines": {
    "node": ">=24.18.1 <25",
    "npm": ">=12.0.2 <13"
  },
  "devDependencies": {
    "check-node-version": "4.2.1"
  },
  "scripts": {
    "prepare": "husky && case \"$npm_command\" in install|ci) check-node-version --package ;; esac"
  }
}
```

[check-node-version](https://www.npmjs.com/package/check-node-version) with
`--package` reads the ranges straight out of `engines`, so the required version
lives in exactly one place. Hooking it into `prepare` runs it on `npm install`
and `npm ci` — which is precisely the moment someone would otherwise get an
install that quietly ignores their allowlist.

The `case` around it is a necessary workaround for my projects: `prepare` also
runs on `npm publish` and on `npm pack`, and
[semantic-release](https://semantic-release.gitbook.io/semantic-release/)
publishes with its own bundled npm — `@semantic-release/npm` depends on
`npm@^11.6.2` — rather than with the one installed on the runner. Without the
guard, the hook will prevent semantic release to invoke the bundled npm.

Then the runner has to actually _have_ npm 12.
[actions/setup-node](https://github.com/actions/setup-node) gives you whichever
npm ships with that Node.js release, which is not necessarily the one you asked
for. I install it explicitly, again from `engines`, so there is still a single
source of truth:

```yaml
# .github/actions/install-npm/action.yml
name: Install NPM
description: >
  Installs the NPM version required by the `engines.npm` directive in
  package.json, which is required for the project to build correctly.

runs:
  using: composite
  steps:
    - name: Install NPM
      shell: bash
      run: |
        npmVersion="$(node -p 'require(`${process.env.GITHUB_WORKSPACE}/package.json`).engines.npm')"
        echo "Installing npm@${npmVersion}"
        npm install -g "npm@${npmVersion}"
```

`npm install -g "npm@>=12.0.2 <13"` is a valid range install, so the range can
be passed through unchanged. Give `setup-node` the same range for Node.js
(`node-version: ">=24.18.1 <25"`), drop the composite action in right after it,
and every workflow is on the version the repository asks for:

```yaml
- uses: actions/setup-node@v7.0.0
  with:
    node-version: ">=24.18.1 <25"
    cache: "npm"

- name: Install NPM version specified in package.json
  uses: ./.github/actions/install-npm

- name: Install dependencies
  run: npm ci --no-audit
```

## Bottom line

npm 12 does not make your dependencies trustworthy. It just stops them from
running before you have decided whether they are.
