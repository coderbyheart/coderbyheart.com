require('ts-node').register({ files: true })
const fs = require('fs')
const path = require('path')

const pJSON = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'),
)

const siteUrl = (process.env.SITE_URL || pJSON.homepage).replace(/\/$/g, '')
const gitHubUrl = pJSON.repository.url

const cfg = {
	pathPrefix: process.env.SITE_DIR,
	siteMetadata: {
		title: `Markus Tacker`,
		tagLine: `Software Crafter`,
		siteUrl,
		// has a zero-width space (​) to mark line-breaks.
		description: `Software Crafter building 🌩️ cloud-based cellular IoT solutions at Nordic Semiconductor.​
		Mentor. Speaker. ​Conference & Community builder. Camper. 🏕️ 🚐`,
		gitHubUrl,
		twitter: '@coderbyheart',
		defaultCard:
			'https://images.ctfassets.net/bncv3c2gt878/3Jk4P6nFPNzaz1gsguktk8/350b7e4ddb2c7d86416243d9902920e2/social-card-default-2020.png',
	},
	plugins: [
		`gatsby-plugin-typescript`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: path.join(process.cwd(), 'content'),
				ignore: [
					'**/.*',
					// ignore files starting with a dot
					'**/*.gif',
					'**/*.png',
					'**/*.jpeg',
					'**/*.jpg',
				],
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {
							offsetY: 80,
						},
					},
					{
						resolve: 'gatsby-remark-external-links',
						options: {
							target: '_blank',
							rel: 'nofollow noreferrer',
						},
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: 'language-',
							inlineCodeMarker: '›',
							showLineNumbers: false,
							noInlineHighlight: true,
						},
					},
					'gatsby-remark-attr',
				],
			},
		},
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-react-helmet-canonical-urls`,
			options: {
				siteUrl: `https://coderbyheart.com`,
			},
		},
		`gatsby-plugin-react-svg`,
		{
			resolve: `gatsby-plugin-disqus`,
			options: {
				shortname: `coderbyheart`,
			},
		},
	],
}

module.exports = cfg
