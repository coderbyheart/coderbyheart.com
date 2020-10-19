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
		description: `As a Software Crafter
		I am using my 20+ years of experience working as a software developer,
		consultant, coach, mentor, and founder to build cloud-based solutions for the
		Internet of Things using JavaScript at Nordic Semiconductor.`,
		gitHubUrl,
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
