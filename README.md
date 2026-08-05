# coderbyheart.com

Source code for [coderbyheart.com](https://coderbyheart.com) — a statically
prerendered personal site and blog built with [Vike](https://vike.dev) and
[SolidJS](https://www.solidjs.com).

## How it works

### Content

Posts and pages live as Markdown files under `content/`:

- `content/*.md` — static pages (home, talks, communities, …)
- `content/post/*.md` — blog posts

Each file can include YAML frontmatter (`title`, `date`, `abstract`, `hero`, …).
At build time, Markdown is processed with [remark](https://remark.js.org/) and
[rehype](https://github.com/rehypejs/rehype) into HTML. Syntax highlighting uses
[rehype-prism-plus](https://github.com/timothymclane/rehype-prism-plus).

Custom embeds in Markdown (YouTube, Mastodon) are rendered as SolidJS components
on the client via `component/Markdown.tsx`.

### Build and deployment

[Vike](https://vike.dev) prerender every route into static HTML in
`dist/client/`. The site is deployed to **GitHub Pages** when a release is cut
on the `saga` branch:

1. The **Test** workflow builds the site, runs Playwright smoke tests, and uses
   [semantic-release](https://semantic-release.gitbook.io/) to create a GitHub
   release when conventional commits warrant one.
2. On success, the build artifact is uploaded.
3. The **Deploy to GitHub Pages** workflow downloads that artifact and publishes
   it.

During prerender, `pages/+onPrerenderStart.ts` also generates `sitemap.xml` and
`rss.xml`.

### Image pipeline

Images are the most involved part of the build. The blog does not ship
full-resolution originals in the static site. Instead, originals are stored in
S3 and served through an on-demand image scaling service.

#### [photos-scaler](https://github.com/coderbyheart/photos-scaler)

[photos-scaler](https://github.com/coderbyheart/photos-scaler) is a separate AWS
CDK project that provides the image CDN this site relies on. It deploys:

- An **originals bucket** — `photos.coderbyheart` on S3 (shared with
  [photos.coderbyheart.com](https://photos.coderbyheart.com))
- A **resized bucket** — stores generated WebP variants
- A **Lambda function** (with an ImageMagick layer) exposed via a Function URL —
  this is the scaling endpoint

When a request hits the Lambda URL, it reads the original from S3, resizes it
with ImageMagick, caches the result in the resized bucket, and redirects to the
cached file. Query parameters control the output:

| Parameter       | Purpose                                                |
| --------------- | ------------------------------------------------------ |
| `f=raw`         | Redirect to the original in S3 (default)               |
| `f=placeholder` | Tiny 16px-wide blur placeholder                        |
| `f=preview`     | Small 64px-wide preview                                |
| `f=thumb`       | Square crop thumbnail                                  |
| `f=scaled`      | Width-constrained resize                               |
| `w`, `h`        | Target dimensions (rounded to 250px steps server-side) |
| `q`             | Quality 1–10                                           |

The Lambda URL is configured as `PHOTOS_CDN_ENDPOINT` during the build.

#### Build-time image processing

When Markdown is compiled (`util/replaceImages.ts`), each `![alt](src)` is
resolved through one of four paths:

1. **Local file** (relative path, e.g. `../media/foo.jpeg`) — dimensions are
   read with ImageMagick `identify`, the file is uploaded to
   `s3://photos.coderbyheart/coderbyheart.com/media/{checksum}`, and
   placeholder/preview variants are fetched from photos-scaler.
2. **External URL** — downloaded, cached under `content/media/cache/`, uploaded
   to S3, same CDN flow. Animated GIFs are copied into the post's
   `content/media/` folder and the Markdown source is rewritten to reference the
   local copy (photos-scaler only keeps the first frame of GIFs).
3. **`https://photos.coderbyheart.com/…`** — metadata (dimensions, CDN URL,
   previews) is fetched from the photos API and linked to the existing original
   already in S3.
4. **Local SVG or GIF** — copied to `public/media/` and served as a static asset
   without the CDN.

For each processed image, CDN metadata (URL, dimensions, base64-encoded
placeholder and preview) is written to `content/media/cache/{checksum}.json` and
committed to the repository so subsequent builds skip re-uploading.

The HTML output replaces `<img>` tags with `<picture>` elements: a
`<source srcset="…">` pointing at the CDN URL and an `<img src="…">` using the
inline base64 preview as a lightweight placeholder.

#### Runtime responsive images

At page load, images behave differently depending on context:

- **Hero images** (`component/Hero/Hero.tsx`) — the SolidJS component measures
  the rendered width, accounts for `devicePixelRatio`, and requests a
  right-sized variant from photos-scaler using `?f=scaled&w=…&h=…&q=9`. The
  scaled URL is preloaded with `fetch`, then swapped into the `<source srcset>`
  so the browser upgrades from the blur preview to the sharp image.
- **Inline images in posts** — served as static `<picture>` elements from the
  prerendered HTML. The `<img>` shows the base64 preview immediately; the
  `<source>` points at the CDN URL for the full original.

The `sized()` and `thumb()` helpers in `Hero.tsx` construct the query strings
that photos-scaler expects.

## Development

### Prerequisites

- Node.js `>=24.18.1` and npm `>=12.0.2 <13` (enforced via
  [check-node-version](https://www.npmjs.com/package/check-node-version) on
  `npm install` and `npm ci`). In CI, the npm version from the `engines.npm`
  directive is installed by the `.github/actions/install-npm` composite action.
- [ImageMagick](https://imagemagick.org/) (`identify` must be on `$PATH` — used
  during the build to read image dimensions)
- AWS credentials with write access to the `photos.coderbyheart` S3 bucket (only
  needed when processing new or changed images)

### Setup

```sh
npm ci
```

### Environment variables

These are required when the build encounters images that need uploading or CDN
metadata generation:

| Variable                | Example                                     | Purpose                  |
| ----------------------- | ------------------------------------------- | ------------------------ |
| `PHOTOS_BUCKET_NAME`    | `photos.coderbyheart`                       | S3 bucket for originals  |
| `PHOTOS_CDN_ENDPOINT`   | `https://….lambda-url.eu-central-1.on.aws/` | photos-scaler Lambda URL |
| `AWS_ACCESS_KEY_ID`     |                                             | AWS credentials          |
| `AWS_SECRET_ACCESS_KEY` |                                             | AWS credentials          |
| `AWS_REGION`            | `eu-central-1`                              | AWS region               |

If you are only editing text or working with images whose CDN metadata is
already cached in `content/media/cache/`, you can build without AWS credentials.

### Commands

```sh
npm start          # dev server
npm run build      # prerender static site to dist/client/
npm run test:e2e   # Playwright smoke tests (requires a prior build)
```

## Project structure

```
content/           Markdown source (pages and posts)
content/media/     Local image assets and CDN metadata cache
component/         SolidJS UI components
layout/            Page layout shell
pages/             Vike route definitions and data loaders
public/            Static assets (CSS, copied reset stylesheet)
util/              Markdown loading, image pipeline, helpers
```
