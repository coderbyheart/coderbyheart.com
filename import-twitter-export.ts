import jsYaml from 'js-yaml'
import { readFileSync, statSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

type Tweet = {
	tweet: {
		in_reply_to_status_id_str: string //'1585990297963536384'
		in_reply_to_user_id: string //'16647326'
		in_reply_to_status_id: string //'1585990297963536384'
		in_reply_to_screen_name: string //guna_lv
		in_reply_to_user_id_str: string //'16647326'
		retweeted: boolean
		entities: {
			user_mentions: {
				name: string //'Guna'
				screen_name: string //'guna_lv'
				indices: [string, string] //['0', '8']
				id_str: string //'16647326'
				id: string //'16647326'
			}[]
			urls: []
			symbols: []
			media: {
				expanded_url: string //'https://twitter.com/coderbyheart/status/1148607174731554816/photo/1'
				indices: string[] // ['274', '297']
				url: string //'https://t.co/5HVIhrj9cZ'
				media_url: string //'http://pbs.twimg.com/media/D_CsG8fW4AAuJzv.jpg'
				id_str: string //'1148607140296318976'
				id: string //'1148607140296318976'
				media_url_https: string // 'https://pbs.twimg.com/media/D_CsG8fW4AAuJzv.jpg'
				sizes: Record<
					'medium' | 'large' | 'thumb' | 'small',
					{
						w: string //'730'
						h: string //'495'
						resize: 'fit' | 'crop'
					}
				>
				type: 'photo'
				display_url: string // 'pic.twitter.com/5HVIhrj9cZ'
			}[]
			hashtags: []
		}
		favorite_count: string // '2'
		id_str: string // '1148607174731554816'
		truncated: boolean
		retweet_count: string // '0'
		id: string // '1148607174731554816'
		created_at: string // 'Tue Jul 09 14:57:45 +0000 2019'
		full_text: string // 'IMO @zoom_us still offers superior performance for video calls over browser-based alternatives. \nSo, if you are on a Mac you can  (at least for now) disable that your webcam gets turned on automatically,\nand if you want to keep Zoom uninstalled, block the hidden webserver. https://t.co/5HVIhrj9cZ'
		lang: string // 'en', 'de', 'und'
		extended_entities: {
			media: {
				expanded_url: string //'https://twitter.com/coderbyheart/status/1148607174731554816/photo/1'
				url: string //'https://t.co/5HVIhrj9cZ'
				media_url: string //'http://pbs.twimg.com/media/D_CsIjXXsAAMvR0.png'
				id_str: string //'1148607167911669760'
				id: string //'1148607167911669760'
				media_url_https: string //'https://pbs.twimg.com/media/D_CsIjXXsAAMvR0.png'
				sizes: Record<
					'medium' | 'large' | 'thumb' | 'small',
					{
						w: string //'730'
						h: string //'495'
						resize: 'fit' | 'crop'
					}
				>
				type: 'photo' | 'animated_gif' | 'video'
				display_url: string //'pic.twitter.com/5HVIhrj9cZ'
				video_info?: {
					aspect_ratio: string[] // ['11', '8']
					duration_millis?: string //'53284'
					variants: {
						bitrate: string // '0'
						content_type: 'video/mp4'
						url: string //'https://video.twimg.com/tweet_video/E5pWOd1XIAAvEMv.mp4'
					}[]
				}
			}[]
		}
	}
}

const exportsDir = process.argv[process.argv.length - 1]

const main = () => {
	const exportsDirInfo = statSync(exportsDir)

	if (!exportsDirInfo.isDirectory())
		throw new Error(`${exportsDir} is not a directory!`)

	const tweetsJS = readFileSync(
		path.join(exportsDir, 'data', 'tweets.js'),
		'utf-8',
	)
	const window: {
		YTD: {
			tweets: Record<string, Tweet[]>
		}
	} = {
		YTD: {
			tweets: {},
		},
	}

	eval(tweetsJS)

	const int = (s: string): number => parseInt(s, 10)
	const interestingPosts = ['998271886671917056']

	for (const tweets of Object.values(window.YTD.tweets)) {
		// For now only use popular tweets
		const topTweets = tweets
			.filter(
				({ tweet: { favorite_count, id_str } }) =>
					int(favorite_count) >= 100 || interestingPosts.includes(id_str),
			)
			.sort(
				(
					{ tweet: { favorite_count: f1 } },
					{ tweet: { favorite_count: f2 } },
				) => int(f2) - int(f1),
			)

		for (const { tweet } of topTweets) {
			const aspect_ratio = tweet.extended_entities?.media.find(({ type }) =>
				['video', 'animated_gif'].includes(type),
			)?.video_info?.aspect_ratio
			const frontmatter = {
				favorite_count: int(tweet.favorite_count),
				retweet_count: int(tweet.retweet_count),
				created_at: new Date(tweet.created_at).toISOString(),
				lang: tweet.lang,
				full_text: tweet.full_text,
				video_aspect_ratio:
					aspect_ratio !== undefined
						? parseInt(aspect_ratio[0], 10) / parseInt(aspect_ratio[1], 10)
						: undefined,
			}
			const replaced = replaceEntities(tweet)
			const markdown = [
				`---`,
				jsYaml.dump(frontmatter).trim(),
				`---`,
				'',
				replaced,
			].join(os.EOL)

			const mdFile = path.join(
				process.cwd(),
				'content',
				'twitter',
				`${tweet.id_str}.md`,
			)

			writeFileSync(mdFile, markdown, 'utf-8')
		}
	}
}

const replaceEntities = ({
	id_str,
	full_text,
	entities,
	extended_entities,
}: Tweet['tweet']): string => {
	const { user_mentions, urls, media } = entities
	const { media: extended_media } = extended_entities ?? {}

	// Galleries can have multiple photos, they all replace the same string in the Tweet
	const replacements: Record<string, string[]> = {}

	for (const { screen_name } of user_mentions ?? []) {
		replacements[`@${screen_name}`] = [
			...(replacements[`@${screen_name}`] ?? []),
			`[@${screen_name}](https://twitter.com/${screen_name})`,
		]
	}
	for (const { url, expanded_url } of urls ?? []) {
		replacements[url] = [...(replacements[url] ?? []), `<${expanded_url}>`]
	}
	for (const { type, url, media_url_https, video_info } of extended_media ??
		media ??
		[]) {
		if (['video', 'animated_gif'].includes(type)) {
			const variantFiles =
				video_info?.variants
					.sort(
						({ bitrate: b1 }, { bitrate: b2 }) =>
							parseInt(b2 ?? '0', 10) - parseInt(b1 ?? '0', 10),
					)
					.map((variant) => variant.url) ?? []

			const highestBitRate = variantFiles[0]
			const mediaFile = path.parse(new URL(highestBitRate).pathname).base
			replacements[url] = [
				...(replacements[url] ?? []),
				`![Embedded Video](https://twitter-media-coderbyheart.s3.eu-north-1.amazonaws.com/${id_str}-${mediaFile})`,
			]
		} else if (type === 'photo') {
			// Galleries can have multiple photos
			const mediaFile = path.parse(new URL(media_url_https).pathname).base
			replacements[url] = [
				...(replacements[url] ?? []),
				`![Embedded Photo](https://twitter-media-coderbyheart.s3.eu-north-1.amazonaws.com/${id_str}-${mediaFile})`,
			]
		} else {
			throw new Error(`Unknown extended media type: ${type} in ${id_str}!`)
		}
	}

	let replaced = full_text
	for (const [search, replace] of Object.entries(replacements)) {
		replaced = replaced.replace(search, [...new Set(replace)].join('\n\n'))
	}

	return replaced
}

main()
