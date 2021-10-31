# coderbyheart.com

![Build and Release](https://github.com/coderbyheart/coderbyheart.com/workflows/Build%20and%20Release/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/eae9e2d1-2376-4736-b28c-8d51803598a9/deploy-status)](https://app.netlify.com/sites/coderbyheart/deploys)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://dashboard.mergify.io/badges/coderbyheart/coderbyheart.com&style=flat)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Source code for <coderbyheart.com>.

## Start Gatsby

      npm ci
      npm start

## How this project works

Gatsby is configured in [`gatsby-node.js`](./gatsby-node.js) to collect the
markdown files in the `content` folder and turn them into pages.

The start page is rendered using the template
[`src/templates/home.tsx`](./src/templates/home.tsx). For other pages which only
show content [`src/templates/page.tsx`](./src/templates/page.tsx) is used.
