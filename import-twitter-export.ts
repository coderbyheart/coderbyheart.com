import { dump } from 'js-yaml'
import { readFile, stat, writeFile } from 'node:fs/promises'
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
	const exportsDirInfo = await stat(exportsDir)

	if (!exportsDirInfo.isDirectory())
		throw new Error(`${exportsDir} is not a directory!`)

	const tweetsJS = await readFile(
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

	for (const tweets of Object.values(window.YTD.tweets)) {
		for (const { tweet } of tweets) {
			const mdFile = path.join(
				process.cwd(),
				'content',
				'twitter',
				`${tweet.id_str}.md`,
			)
			const { full_text } = tweet
			const replaced = replaceEntities(full_text, tweet)
			if (tweet.id_str === '1586030135265972226') console.log(replaced)
			await writeFile(
				mdFile,
				[`---`, dump(tweet).trim(), `---`, '', replaced].join(os.EOL),
				'utf-8',
			)
		}
	}
}

const replaceEntities = (
	text: string,
	{ id_str, entities: { user_mentions } }: Tweet['tweet'],
): string => {
	const entities = [...user_mentions]
		.map(({ indices, ...rest }) => ({
			...rest,
			indices: indices.map((s) => parseInt(s, 10)) as [number, number],
		}))
		.sort(({ indices: [start1] }, { indices: [start2] }) => start1 - start2)
	const tokens: (
		| {
				plain: {
					text: string
					indices: [number, number]
				}
		  }
		| {
				mention: {
					name: string // Guna
					screen_name: string //guna_lv
					id: string //, '16647326'
					indices: [number, number]
				}
		  }
	)[] = []
	let previousEnd = 0
	for (let i = 0; i < text.length; i++) {
		const hasEntity = entities.find(({ indices: [start] }) => start === i)
		if (hasEntity) {
			if (i > 0)
				tokens.push({
					plain: {
						text: text.substring(previousEnd, i),
						indices: [previousEnd, i],
					},
				})
			i = hasEntity.indices[1]
			previousEnd = i
			tokens.push({
				mention: hasEntity,
			})
		}
	}
	if (previousEnd < text.length) {
		tokens.push({
			plain: {
				text: text.substring(previousEnd, text.length),
				indices: [previousEnd, text.length],
			},
		})
	}

	return tokens
		.map((token) => {
			if ('plain' in token) return token.plain.text
			if ('mention' in token)
				return `[@${token.mention.screen_name}](https://twitter.com/${token.mention.screen_name})`
		})
		.join('')
}

main()
