import { loadContentFromMarkdown } from '#util/loadContentFromMarkdown.ts'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { PageContextServer } from 'vike/types'
import { homepage } from '../siteInfo.ts'

export const onPrerenderStart = async (prerenderContext: {
	pageContexts: PageContextServer[]
}): Promise<{ prerenderContext: { pageContexts: PageContextServer[] } }> => {
	const posts = await loadContentFromMarkdown(
		path.join(process.cwd(), 'content', 'post'),
	)
	const buildTime = new Date().toISOString()
	const base = homepage.replace(/\/$/, '')

	const entries = prerenderContext.pageContexts
		.map((ctx) => ctx.urlOriginal ?? ctx.urlPathname ?? '/')
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

	const xml =
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
		xml,
		'utf-8',
	)

	return { prerenderContext }
}
