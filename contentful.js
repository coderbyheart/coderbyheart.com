const contentful = require('contentful')
const contentfulManagement = require('contentful-management')
const path = require('path')
const { promises: fs, createReadStream } = require('fs')
const crypto = require('crypto')
const { parse } = require('url')
const chalk = require('chalk')

const cacheDir = path.join(process.cwd(), '.contentful-media')

const cf = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_CONTENT_API_TOKEN,
})
const cfM = contentfulManagement.createClient({
	accessToken: process.env.CONTENTFUL_MANAGEMENT_API_TOKEN,
})

const hashString = (src) => {
	const hash = crypto.createHash('sha256')
	hash.update(src)
	return hash.digest('hex')
}

const hashFile = async (path) =>
	new Promise((resolve) => {
		const hash = crypto.createHash('sha1')
		hash.setEncoding('hex')
		const fileStream = createReadStream(path)
		fileStream.pipe(hash, { end: false })
		fileStream.on('end', () => {
			hash.end()
			const h = hash.read().toString()
			resolve(h)
		})
	})

const mediaUrls = {}

const getUrl = (asset) => {
	const {
		fields: {
			file: {
				url,
				details: {
					image: { width, height },
				},
			},
		},
	} = asset
	return `${url}?w=${width}&h=${height}`
}

const getMediaEntry = async (id) => {
	const mediaCache = path.join(cacheDir, `${id}.json`)
	try {
		return JSON.parse(await fs.readFile(mediaCache), 'utf-8')
	} catch {
		const { items } = await cf.getEntries({
			content_type: 'image',
			'fields.id': id,
		})
		if (items.length === 0) throw new Error(`Media entry for ${id} not found.`)
		const media = items[0]
		const asset = await cf.getAsset(media.fields.media.sys.id)
		await fs.writeFile(
			mediaCache,
			JSON.stringify(
				{
					media,
					asset,
				},
				null,
				2,
			),
			'utf-8',
		)
		return { media, asset }
	}
}

const cacheMedia = async (src) => {
	let contentType = 'image/jpeg'
	if (/\.png$/i.test(src)) contentType = 'image/png'
	let isFile = false
	try {
		await fs.stat(src)
		isFile = true
	} catch {}
	const id = isFile ? await hashFile(src) : hashString(src)
	console.log(
		chalk.yellow('contentful'),
		chalk.gray('caching'),
		chalk.blue(src),
	)
	try {
		const { asset } = await getMediaEntry(id)
		return getUrl(asset)
	} catch {
		// Create new asset
		const space = await cfM.getSpace(process.env.CONTENTFUL_SPACE)
		const envs = await space.getEnvironments()
		const fileInfo = {
			title: {
				'en-US': id,
			},
			description: {
				'en-US': `Automatically created from GatsbyJS\n\nSource: ${src}`,
			},
		}
		const assetDraft = await (isFile
			? envs.items[0].createAssetFromFiles({
					fields: {
						...fileInfo,
						file: {
							'en-US': {
								contentType,
								fileName: src.split('/').pop(),
								file: createReadStream(src),
							},
						},
					},
			  })
			: envs.items[0].createAsset({
					fields: {
						...fileInfo,
						file: {
							'en-US': {
								contentType,
								fileName: parse(src).path.split('/').pop(),
								upload: src,
							},
						},
					},
			  }))
		const readyAsset = await assetDraft.processForAllLocales()
		const asset = await readyAsset.publish()
		// Create new Media
		const mediaDraft = await envs.items[0].createEntry('image', {
			fields: {
				id: {
					'en-US': id,
				},
				media: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Asset',
							id: asset.sys.id,
						},
					},
				},
			},
		})
		await mediaDraft.publish()

		const { asset: createdAsset } = await getMediaEntry(id)
		const url = getUrl(createdAsset)
		console.log(
			chalk.green('contentful'),
			chalk.gray('cached'),
			chalk.blueBright(url),
		)
		return url
	}
}

const getMediaUrl = async (src) => {
	if (mediaUrls[src] === undefined) {
		mediaUrls[src] = new Promise((resolve) => cacheMedia(src).then(resolve))
	}
	return mediaUrls[src]
}

const replaceImageTags = (relativeDirectory) => async ({
	children,
	tagName,
	properties,
	...rest
}) => {
	if (tagName === 'img') {
		const isFile = !/^http/.test(properties.src)
		const src = isFile
			? path.normalize(
					path.join(
						process.cwd(),
						'content',
						relativeDirectory,
						properties.src,
					),
			  )
			: properties.src
		return {
			children: children?.map(replaceImageTags(relativeDirectory)) ?? [],
			tagName,
			properties: {
				...properties,
				src: await getMediaUrl(src),
			},
			...rest,
		}
	}
	return {
		children: await Promise.all(
			children?.map(replaceImageTags(relativeDirectory)) ?? [],
		),
		tagName,
		properties,
		...rest,
	}
}

exports.cacheImages = async ({ children, ...rest }, relativeDirectory) => {
	try {
		await fs.stat(cacheDir)
	} catch {
		await fs.mkdir(cacheDir)
	}
	return {
		children: await Promise.all(
			children?.map(replaceImageTags(relativeDirectory)) ?? [],
		),
		...rest,
	}
}
