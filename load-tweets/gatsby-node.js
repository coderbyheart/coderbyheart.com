const { readdir, readFile } = require('node:fs/promises')
const path = require('node:path')
const fs = require('node:fs')

const mostPopular = [
	'1119970835014529024',
	'1094671850246995969',
	'1070252678004072448',
	'1069176992564682752',
	'1540812534772629505',
	'1031812485538557953',
	'1018901853986328576',
	'994982356279812098',
	'974011968075059200',
	'970959569781448705',
	'947614418099101696',
	'940636875794067456',
	'1579742177738969088',
	'1528344380280606721',
	'890879242619277312',
	'861150376782856192',
	'857535331096305664',
	'825669823921319937',
	'1519790994354495489',
	'1514596881258749954',
	'676155415223255041',
	'1501116191095595011',
	'1500794055625748484',
	'1475871112806510592',
	'1474349369214312454',
	'1459174125096902660',
	'1571444686363009025',
	'1571266231960834049',
	'1443999700449890306',
	'1443678982705238019',
	'1442809096671989764',
	'1417467043079667717',
	'1414856691787632642',
	'1414489800304902144',
	'1412540547990962178',
	'1412537304489529344',
	'1412536247004848134',
	'1412535313931673602',
	'1412534968341909515',
	'1412534739727171587',
	'1406947490973241344',
	'1565764423519797249',
	'1370389316652965891',
	'1563808551172177921',
	'1342099298939510784',
	'1323339394036731905',
	'1312689222176976896',
	'1308710318252740608',
	'1279545892010446848',
	'1267091757868683265',
	'1239476222452813825',
	'1238415032087728128',
	'1220729694909292547',
	'1212980450861420544',
	'1190691557185392641',
	'1183296618776453121',
	'1547088013523668998',
	'1124623718192504833',
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
		if (development && !mostPopular.includes(id) && Math.random() > 0.005)
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
