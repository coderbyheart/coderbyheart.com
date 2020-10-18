// Exports the content from Contentful to local markdown files

const { promises: fs } = require('fs')
const path = require('path')
const contentful = require('contentful')
const prettier = require('prettier')
const fetch = require('node-fetch')

const cf = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_CONTENT_API_TOKEN,
})

const postsCache = path.join(
	process.cwd(),
	'.contentful-media',
	`posts-cache.json`,
)

const defaultHero =
	'//images.ctfassets.net/bncv3c2gt878/DJtd5QnpG84a022w8iwWE/23e0ac775f4a6a19235907491b552ced/5047079500_a770f91337_o.jpg'

const loadPosts = async () => {
	try {
		const { items } = JSON.parse(await fs.readFile(postsCache, 'utf-8'))
		return items
	} catch {
		const res = await cf.getEntries({
			content_type: 'post',
		})
		await fs.writeFile(postsCache, JSON.stringify(res, null, 2), 'utf-8')
		const { items } = res
		return items
	}
}

const download = async (url, target) => {
	try {
		await fs.stat(target)
		console.log('cached', url, '->', target)
	} catch {
		console.log('downloading', url, '->', target)
		return fetch(url.replace(/^\/\//, 'https://'))
			.then((res) => res.buffer())
			.then((b) => fs.writeFile(target, b, 'binary'))
	}
}

const trimTwitterSize = (s) => s.replace(/:[a-z]+$/, '')

const indent = (s) =>
	s
		.split('\n')
		.filter((s) => s)
		.map((s) => `  ${s}`)
		.join('\n')

const main = async () => {
	await Promise.all(
		(await loadPosts()).map(
			async ({
				fields: {
					title,
					subtitle,
					slug,
					publicationDate,
					content,
					abstract,
					hero: {
						fields: {
							title: heroTitle,
							file: { url: heroUrl, fileName: heroFilename },
						},
					},
				},
			}) => {
				// Download images
				const mediaDir = path.join(
					process.cwd(),
					'content',
					'media',
					`${publicationDate.substr(0, 10)}-${slug}`,
				)

				const images = [
					...(content.match(
						/(https?:)?\/\/(images\.ctfassets\.net|images\.contentful\.com)\/[^\)]+/g,
					) ?? []),
				]
				const hasAdditionalImages = images.length >= 1
				const replacements = []
				if (hasAdditionalImages) {
					try {
						await fs.mkdir(mediaDir)
					} catch {}
					if (heroUrl !== defaultHero) {
						const heroPath = path.join(
							mediaDir,
							`hero.${trimTwitterSize(heroFilename.split('.').pop())}`,
						)
						await download(heroUrl, heroPath)
						replacements.push([
							heroUrl,
							path.join(
								'..',
								`media`,
								`${publicationDate.substr(0, 10)}-${slug}`,
								`hero.${trimTwitterSize(heroFilename.split('.').pop())}`,
							),
						])
					}

					// Download additional images
					await Promise.all(
						images.map(async (src) => {
							const filename = trimTwitterSize(
								src.split('/').pop().split('?')[0],
							)
							const imagePath = path.join(mediaDir, filename)
							await download(src, imagePath)
							replacements.push([
								src,
								path.join(
									'..',
									`media`,
									`${publicationDate.substr(0, 10)}-${slug}`,
									filename,
								),
							])
						}),
					)
				} else if (heroUrl !== defaultHero) {
					const heroPath = path.join(
						process.cwd(),
						'content',
						'media',
						`${publicationDate.substr(0, 10)}-${slug}.${trimTwitterSize(
							heroFilename.split('.').pop(),
						)}`,
					)
					await download(heroUrl, heroPath)
					replacements.push([
						heroUrl,
						path.join(
							'..',
							`media`,
							`${publicationDate.substr(0, 10)}-${slug}.${trimTwitterSize(
								heroFilename.split('.').pop(),
							)}`,
						),
					])
				}

				const filename = path.join(
					process.cwd(),
					'content',
					'post',
					`${publicationDate.substr(0, 10)}-${slug}.md`,
				)
				return fs.writeFile(
					filename,
					prettier.format(
						replacements.reduce(
							(content, [from, to]) => content.replace(from, to),
							[
								'---',
								`title: >-`,
								indent(title),
								...(subtitle ? [`subtitle: >-`, indent(subtitle)] : []),
								...(abstract ? [`abstract: |`, indent(abstract)] : []),
								`date: ${publicationDate}`,
								'---',
								'',
								...(heroUrl !== defaultHero
									? [`![${heroTitle}](${heroUrl})`, '']
									: []),
								content,
							].join('\n'),
						),
						{
							parser: 'markdown',
							proseWrap: 'always',
							printWidth: 80,
							endOfLine: 'lf',
						},
					),
					'utf-8',
				)
			},
		),
	).catch(console.error)
}

main()
