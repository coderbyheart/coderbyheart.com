import { loadContentFromMarkdown } from '#util/loadContentFromMarkdown.ts'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { PageContextServer } from 'vike/types'
import { homepage } from '../siteInfo.ts'
import { name, tagLine } from './info.ts'

const escapeXml = (s: string): string =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')

export const onPrerenderStart = async (prerenderContext: {
	pageContexts: PageContextServer[]
}): Promise<void> => {
	const posts = await loadContentFromMarkdown(
		path.join(process.cwd(), 'content', 'post'),
	)
	const buildTime = new Date().toISOString()
	const base = homepage.replace(/\/$/, '')

	const entries = prerenderContext.pageContexts
		.map((ctx) => ctx.urlOriginal ?? '/')
		.filter((url, i, all) => all.indexOf(url) === i)
		.sort()
		.map((url) => {
			const slug = url.replace(/^\//, '')
			const post = posts.get(slug)
			const date = post?.date
			const lastmod =
				date !== undefined
					? new Date(date as string | Date).toISOString()
					: buildTime
			return { url, lastmod }
		})

	const sitemapXml =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		entries
			.map(
				({ url, lastmod }) =>
					`\t<url>\n` +
					`\t\t<loc>${base}${encodeURI(url)}</loc>\n` +
					`\t\t<lastmod>${lastmod}</lastmod>\n` +
					`\t</url>`,
			)
			.join('\n') +
		`\n</urlset>\n`

	await writeFile(
		path.join(process.cwd(), 'dist', 'client', 'sitemap.xml'),
		sitemapXml,
		'utf-8',
	)

	const feedItems = Array.from(posts.values())
		.filter((post) => post.date !== undefined && post.title !== undefined)
		.map((post): MarkdownContent & { pubDate: Date } => ({
			...post,
			pubDate: new Date(post.date as string | Date),
		}))
		.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
		.slice(0, 20)

	const lastBuildDate = (
		feedItems[0]?.pubDate ?? new Date(buildTime)
	).toUTCString()

	const rssXml =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">\n` +
		`\t<channel>\n` +
		`\t\t<title>${escapeXml(`${name} · ${tagLine}`)}</title>\n` +
		`\t\t<link>${base}/</link>\n` +
		`\t\t<atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />\n` +
		`\t\t<description>${escapeXml(tagLine)}</description>\n` +
		`\t\t<language>en</language>\n` +
		`\t\t<lastBuildDate>${lastBuildDate}</lastBuildDate>\n` +
		feedItems
			.map((post) => {
				const url = `${base}/${encodeURIComponent(post.slug)}`
				const title = String(post.title ?? post.slug)
				const description =
					typeof post.abstract === 'string' ? post.abstract : ''
				const html = typeof post.html === 'string' ? post.html : ''
				return (
					`\t\t<item>\n` +
					`\t\t\t<title>${escapeXml(title)}</title>\n` +
					`\t\t\t<link>${url}</link>\n` +
					`\t\t\t<guid isPermaLink="true">${url}</guid>\n` +
					`\t\t\t<pubDate>${post.pubDate.toUTCString()}</pubDate>\n` +
					`\t\t\t<dc:creator>${escapeXml(name)}</dc:creator>\n` +
					(description.length > 0
						? `\t\t\t<description>${escapeXml(description)}</description>\n`
						: '') +
					`\t\t\t<content:encoded><![CDATA[${html.replace(/]]>/g, ']]]]><![CDATA[>')}]]></content:encoded>\n` +
					`\t\t</item>`
				)
			})
			.join('\n') +
		`\n\t</channel>\n` +
		`</rss>\n`

	await writeFile(
		path.join(process.cwd(), 'dist', 'client', 'rss.xml'),
		rssXml,
		'utf-8',
	)
}
