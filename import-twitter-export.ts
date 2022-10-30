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
				type: 'photo'
				display_url: string //'pic.twitter.com/5HVIhrj9cZ'
			}[]
		}
	}
}

const exportsDir = process.argv[process.argv.length - 1]

const main = async () => {
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

	for (const tweets of Object.values(window.YTD.tweets)) {
		// For now only use the 100 most favorited tweets
		const topTweets = tweets
			.filter(({ tweet: { favorite_count } }) => int(favorite_count) >= 100)
			.sort(
				(
					{ tweet: { favorite_count: f1 } },
					{ tweet: { favorite_count: f2 } },
				) => int(f2) - int(f1),
			)

		for (const { tweet } of topTweets) {
			console.log(tweet.id_str)
			const frontmatter = {
				favorite_count: int(tweet.favorite_count),
				retweet_count: int(tweet.retweet_count),
				created_at: new Date(tweet.created_at).toISOString(),
				lang: tweet.lang,
				full_text: tweet.full_text,
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

			console.log(mdFile, `written`)
		}
	}
}

const replaceEntities = ({
	full_text,
	entities: { user_mentions, urls, media },
}: Tweet['tweet']): string => {
	let replaced = full_text
	for (const { screen_name } of user_mentions ?? []) {
		replaced = replaced.replace(
			`@${screen_name}`,
			`[@${screen_name}](https://twitter.com/${screen_name})`,
		)
	}
	for (const { url, display_url, expanded_url } of urls ?? []) {
		replaced = replaced.replace(url, `[${display_url}](${expanded_url})`)
	}
	for (const { media_url_https, url, display_url } of media ?? []) {
		replaced = replaced.replace(url, `![${display_url}](${media_url_https})`)
	}
	return replaced
}

main()
