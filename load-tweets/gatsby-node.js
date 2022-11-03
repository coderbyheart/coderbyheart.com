const { readdir, readFile } = require('node:fs/promises')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const fs = require('node:fs')
const mostPopular = JSON.parse(
	readFileSync(
		path.join(process.cwd(), 'load-tweets', 'most-popular.json'),
		'utf-8',
	),
)

const interestingTweets = [
	...mostPopular,
	'1578257500650221568', // Gallery with 4
]

exports.sourceNodes = async (
	{ actions: { createNode }, createContentDigest, reporter },
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
		const id = path.parse(tweet).name
		// Only use 1% of all tweets for development, and most popular
		if (development && !interestingTweets.includes(id) && Math.random() > 0.005)
			continue
		const pathToFile = path.join(tweetsFolder, tweet)

		const markdown = await readFile(pathToFile, 'utf-8')
		await createNode({
			id,
			children: [],
			parent: null,
			internal: {
				contentDigest: createContentDigest(markdown),
				type: `Tweet`,
				description: `Tweet "${tweet}"`,
				mediaType: 'text/markdown',
				content: markdown,
			},
			absolutePath: pathToFile,
		})
	}
}
