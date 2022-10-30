const contentful = require('contentful')
const contentfulManagement = require('contentful-management')
const path = require('path')
const { promises: fs, createReadStream } = require('fs')
const crypto = require('crypto')
const { parse } = require('url')
const chalk = require('chalk')
const Bottleneck = require('bottleneck')
const limiter = new Bottleneck({
	minTime: 1000 / 5,
	maxConcurrent: 5,
})

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
				details: { image },
				contentType,
			},
		},
	} = asset
	if (contentType === 'video/mp4') return url
	const { width, height } = image
	return `${url}?w=${width}&h=${height}`
}

const getMediaEntry = async (id) => {
	const mediaCache = path.join(cacheDir, `${id}.json`)
	try {
		return {
			...JSON.parse(await fs.readFile(mediaCache), 'utf-8'),
			local: true,
		}
	} catch {
		const { items } = await limiter.schedule(() =>
			cf.getEntries({
				content_type: 'image',
				'fields.id': id,
			}),
		)
		if (items.length === 0) throw new Error(`Media entry for ${id} not found.`)
		const media = items[0]
		const asset = await limiter.schedule(() =>
			cf.getAsset(media.fields.media.sys.id),
		)
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
		return { media, asset, local: false }
	}
}

const mediaEntries = {}

const cacheMedia = async ({ src, env }) => {
	let isFile = false
	try {
		await fs.stat(src)
		isFile = true
	} catch {}
	const id = isFile ? await hashFile(src) : hashString(src)

	try {
		const { asset, local } = await getMediaEntry(id)
		console.log(
			chalk.yellow('contentful'),
			chalk.gray('cached'),
			local ? chalk.blueBright('local') : chalk.blue('remote'),
			chalk.blue(src),
		)
		return getUrl(asset)
	} catch {
		if (!mediaEntries[id]) {
			mediaEntries[id] = new Promise(async (resolve) => {
				// Create new asset
				console.log(
					chalk.yellow('contentful'),
					chalk.gray('uploading'),
					chalk.blue(src),
				)
				const fileInfo = {
					title: {
						'en-US': id,
					},
					description: {
						'en-US': `Automatically created from GatsbyJS\n\nSource: ${src}`,
					},
				}
				let contentType = 'image/jpeg'
				if (/\.png$/i.test(src)) contentType = 'image/png'
				if (/\.gif$/i.test(src)) contentType = 'image/gif'
				if (/\.svg$/i.test(src)) contentType = 'image/svg+xml'
				if (/\.mp4$/i.test(src)) contentType = 'video/mp4'
				const assetDraft = await (isFile
					? limiter.schedule(() =>
							env.createAssetFromFiles({
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
							}),
					  )
					: limiter.schedule(() =>
							env.createAsset({
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
							}),
					  ))
				const readyAsset = await limiter.schedule(() =>
					assetDraft.processForAllLocales(),
				)
				const asset = await limiter.schedule(() => readyAsset.publish())
				// Create new Media
				console.log(
					chalk.yellow('contentful'),
					chalk.gray('creating media entry'),
					chalk.blue(src),
				)
				const mediaDraft = await limiter.schedule(() =>
					env.createEntry('image', {
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
					}),
				)
				await limiter.schedule(() => mediaDraft.publish())

				const { asset: createdAsset } = await getMediaEntry(id)
				const url = getUrl(createdAsset)
				console.log(
					chalk.green('contentful'),
					chalk.green('uploaded'),
					chalk.blueBright(url),
				)
				return resolve(url)
			})
		}
		return mediaEntries[id]
	}
}

const getMediaUrl = async ({ env, src }) => {
	if (mediaUrls[src] === undefined) {
		mediaUrls[src] = new Promise((resolve) =>
			cacheMedia({ env, src }).then(resolve),
		)
	}
	return mediaUrls[src]
}

const replaceImage =
	({ env, relativeDirectory }) =>
	async (src) => {
		const isFile = !/^http/.test(src)
		const imageSrc = isFile
			? path.normalize(
					path.join(process.cwd(), 'content', relativeDirectory, src),
			  )
			: src
		return await getMediaUrl({ env, src: imageSrc })
	}

const replaceImageTags =
	({ env, relativeDirectory }) =>
	async ({ children, tagName, properties, ...rest }) => {
		if (tagName === 'img') {
			return {
				properties: {
					...properties,
					src: await replaceImage({ env, relativeDirectory })(properties.src),
				},
				children:
					(await Promise.all(
						children?.map(replaceImageTags({ env, relativeDirectory })),
					)) ?? [],
				tagName,
				...rest,
			}
		}
		return {
			children: await Promise.all(
				children?.map(replaceImageTags({ env, relativeDirectory })) ?? [],
			),
			tagName,
			properties,
			...rest,
		}
	}

const envPromise = limiter
	.schedule(() => cfM.getSpace(process.env.CONTENTFUL_SPACE))
	.then((space) => limiter.schedule(() => space.getEnvironments()))
	.then((res) => res.items[0])

const cacheDirPromise = (async () => {
	try {
		await fs.stat(cacheDir)
	} catch {
		await fs.mkdir(cacheDir, { recursive: true })
	}
})()

exports.cacheImages = async ({ children, ...rest }, relativeDirectory) => {
	await cacheDirPromise
	const env = await envPromise

	return {
		children: await Promise.all(
			children?.map(replaceImageTags({ env, relativeDirectory })) ?? [],
		),
		...rest,
	}
}

exports.cacheImage = async (src, relativeDirectory) => {
	await cacheDirPromise
	const env = await envPromise
	return replaceImage({ env, relativeDirectory })(src)
}
