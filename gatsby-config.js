require('ts-node').register({ files: true })
const fs = require('fs')
const path = require('path')

const pJSON = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'),
)

const siteUrl = (process.env.SITE_URL || pJSON.homepage).replace(/\//g, '')
const gitHubUrl = pJSON.repository.url

const cfg = {
	pathPrefix: process.env.SITE_DIR,
	siteMetadata: {
		title: `Markus Tacker`,
		tagLine: `coder by heart and organizational hacker by passion`,
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
				],
			},
		},
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-react-svg`,
	],
}

module.exports = cfg
