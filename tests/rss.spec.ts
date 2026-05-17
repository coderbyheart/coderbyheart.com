import { expect, test } from '@playwright/test'

test('RSS feed is served with a valid schema', async ({ request, page }) => {
	const response = await request.get('/rss.xml')
	expect(response.status()).toBe(200)
	expect(response.headers()['content-type']).toMatch(/xml/)

	const xml = await response.text()

	await page.goto('about:blank')
	const result = await page.evaluate((xmlText) => {
		const doc = new DOMParser().parseFromString(xmlText, 'application/xml')
		const parserError = doc.querySelector('parsererror')
		if (parserError !== null)
			return { ok: false as const, error: parserError.textContent ?? 'parse' }

		const rss = doc.documentElement
		const atomNS = 'http://www.w3.org/2005/Atom'
		const contentNS = 'http://purl.org/rss/1.0/modules/content/'

		const channel = rss.querySelector('channel')
		const items = Array.from(channel?.querySelectorAll('item') ?? [])

		return {
			ok: true as const,
			rootName: rss.nodeName,
			version: rss.getAttribute('version'),
			channelTitle: channel?.querySelector('title')?.textContent ?? null,
			channelLink: channel?.querySelector('link')?.textContent ?? null,
			channelDescription:
				channel?.querySelector('description')?.textContent ?? null,
			lastBuildDate:
				channel?.querySelector('lastBuildDate')?.textContent ?? null,
			atomSelfHref:
				channel
					?.getElementsByTagNameNS(atomNS, 'link')[0]
					?.getAttribute('href') ?? null,
			itemCount: items.length,
			items: items.map((item) => ({
				title: item.querySelector('title')?.textContent ?? null,
				link: item.querySelector('link')?.textContent ?? null,
				guid: item.querySelector('guid')?.textContent ?? null,
				pubDate: item.querySelector('pubDate')?.textContent ?? null,
				hasEncodedContent:
					item.getElementsByTagNameNS(contentNS, 'encoded').length > 0,
			})),
		}
	}, xml)

	if (!result.ok) throw new Error(`RSS XML failed to parse: ${result.error}`)

	expect(result.rootName).toBe('rss')
	expect(result.version).toBe('2.0')
	expect(result.channelTitle).toBe('Markus Tacker · Software Crafter')
	expect(result.channelLink).toMatch(/^https?:\/\/.+/)
	expect(result.channelDescription?.length ?? 0).toBeGreaterThan(0)
	expect(result.atomSelfHref).toMatch(/\/rss\.xml$/)
	expect(Number.isNaN(Date.parse(result.lastBuildDate ?? ''))).toBe(false)

	expect(result.itemCount).toBeGreaterThan(0)
	for (const item of result.items) {
		expect(item.title?.length ?? 0).toBeGreaterThan(0)
		expect(item.link).toMatch(/^https?:\/\/.+/)
		expect(item.guid).toMatch(/^https?:\/\/.+/)
		expect(Number.isNaN(Date.parse(item.pubDate ?? ''))).toBe(false)
		expect(item.hasEncodedContent).toBe(true)
	}
})
