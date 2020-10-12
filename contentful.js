const contentful = require('contentful')
const contentfulManagement = require('contentful-management')
const os = require('os')
const path = require('path')
const { promises: fs } = require('fs')
const crypto = require('crypto')
const { parse } = require('url')
const chalk = require('chalk')

const cacheDir = path.join(process.cwd(), '.contentful')

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

const mediaUrls = {}

const getUrl = (asset) => {
	const {
		fields: { file },
	} = asset
	const url = file?.['en-US']?.url ?? file?.url
	const { width, height } =
		file?.['en-US']?.details?.image ?? file?.details?.image
	return `${url}?w=${width}&h=${height}`
}

const cacheMediaData = async (id, media, asset) => {
	const mediaCache = path.join(cacheDir, `${id}.json`)
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
}

const cacheMedia = async (src) => {
	const parsed = parse(src)
	let contentType = 'image/jpeg'
	if (/\.png$/i.test(src)) contentType = 'image/png'
	const id = hashString(src)
	const mediaCache = path.join(cacheDir, `${id}.json`)
	try {
		const { asset } = JSON.parse(await fs.readFile(mediaCache), 'utf-8')
		return getUrl(asset)
	} catch {
		console.log(
			chalk.yellow('contentful'),
			chalk.gray('caching'),
			chalk.blue(src),
		)
		const { items } = await cf.getEntries({
			content_type: 'image',
			'fields.id': id,
		})
		if (items.length > 0) {
			const media = items[0]
			const asset = await cf.getAsset(media.fields.media.sys.id)
			await cacheMediaData(id, media, asset)
			return getUrl(asset)
		}
		// Create new asset
		const space = await cfM.getSpace(process.env.CONTENTFUL_SPACE)
		const envs = await space.getEnvironments()
		const assetDraft = await envs.items[0].createAsset({
			fields: {
				title: {
					'en-US': id,
				},
				description: {
					'en-US': `Automatically created from GatsbyJS\n\nSource: ${src}`,
				},
				file: {
					'en-US': {
						contentType,
						fileName: parsed.path.split('/').pop(),
						upload: src,
					},
				},
			},
		})
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
		const media = await mediaDraft.publish()
		// Create
		await cacheMediaData(id, media, asset)
		const url = getUrl(asset)
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

const replaceImageTags = async ({ children, tagName, properties, ...rest }) => {
	if (tagName === 'img') {
		return {
			children: children?.map(replaceImageTags) ?? [],
			tagName,
			properties: {
				...properties,
				src: await getMediaUrl(properties.src),
			},
			...rest,
		}
	}
	return {
		children: await Promise.all(children?.map(replaceImageTags) ?? []),
		tagName,
		properties,
		...rest,
	}
}

exports.cacheImages = async ({ children, ...rest }) => {
	try {
		await fs.stat(cacheDir)
	} catch {
		await fs.mkdir(cacheDir)
	}
	return {
		children: await Promise.all(children?.map(replaceImageTags) ?? []),
		...rest,
	}
}
