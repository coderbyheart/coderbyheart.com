const { readdir } = require('node:fs/promises')
const fs = require(`fs-extra`)
const mime = require(`mime`)
const prettyBytes = require(`pretty-bytes`)
const md5File = require(`md5-file`)
const { slash } = require(`gatsby-core-utils`)
const path = require('node:path')

const createAndProcessNode = async (
	pathToFile,
	createNode,
	createNodeId,
	pluginOptions,
) => {
	const slashed = slash(pathToFile)
	const parsedSlashed = path.parse(slashed)
	const slashedFile = {
		...parsedSlashed,
		absolutePath: slashed,
		// Useful for limiting graphql query with certain parent directory
		relativeDirectory: slash(
			path.relative(pluginOptions.path || process.cwd(), parsedSlashed.dir),
		),
	}
	const contentDigest = await md5File(slashedFile.absolutePath)
	const mediaType = mime.getType(slashedFile.ext)
	const stats = await fs.stat(slashedFile.absolutePath)

	const fileNode = {
		// Don't actually make the File id the absolute path as otherwise
		// people will use the id for that and ids shouldn't be treated as
		// useful information.
		id: createNodeId(pathToFile),
		children: [],
		parent: null,
		internal: {
			contentDigest,
			type: `Tweet`,
			mediaType: mediaType ? mediaType : `application/octet-stream`,
			description: `Tweet "${path.relative(process.cwd(), slashed)}"`,
		},
		sourceInstanceName: pluginOptions.name || `__PROGRAMMATIC__`,
		relativePath: slash(
			path.relative(
				pluginOptions.path || process.cwd(),
				slashedFile.absolutePath,
			),
		),
		extension: slashedFile.ext.slice(1).toLowerCase(),
		prettySize: prettyBytes(stats.size),
		modifiedTime: stats.mtime.toJSON(),
		accessTime: stats.atime.toJSON(),
		changeTime: stats.ctime.toJSON(),
		birthTime: stats.birthtime.toJSON(),
		// Note: deprecate splatting the slashedFile object
		// Note: the object may contain different properties depending on File or Dir
		...slashedFile,
		// TODO: deprecate copying the entire object
		// Note: not splatting for perf reasons (make sure Date objects are serialized)
		dev: stats.dev,
		mode: stats.mode,
		nlink: stats.nlink,
		uid: stats.uid,
		rdev: stats.rdev,
		blksize: stats.blksize,
		ino: stats.ino,
		size: stats.size,
		blocks: stats.blocks,
		atimeMs: stats.atimeMs,
		mtimeMs: stats.mtimeMs,
		ctimeMs: stats.ctimeMs,
		birthtimeMs: stats.birthtimeMs,
		atime: stats.atime.toJSON(),
		mtime: stats.mtime.toJSON(),
		ctime: stats.ctime.toJSON(),
		birthtime: stats.birthtime.toJSON(),
	}
	await createNode(fileNode)
}

exports.sourceNodes = async (
	{ actions: { createNode }, createNodeId, reporter },
	{ development, path: tweetsFolder },
) => {
	reporter.info(
		`[load-tweets] ${
			development ? 'Building for development' : 'Building for production'
		}`,
	)
	reporter.info(`[load-tweets] Path: ${tweetsFolder}`)
	const tweets = await readdir(tweetsFolder)
	reporter.info(`[load-tweets] Found ${tweets.length} tweets`)
	for (const tweet of tweets) {
		// Only use 1% of all tweets for development
		if (development && Math.random() > 0.01) continue
		await createAndProcessNode(
			path.join(tweetsFolder, tweet),
			createNode,
			createNodeId,
			{ path: tweetsFolder },
		)
	}
}

exports.loadNodeContent = (fileNode) =>
	fs.readFile(fileNode.absolutePath, `utf-8`)
