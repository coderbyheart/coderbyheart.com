require('ts-node').register({ files: true })
const path = require('path')
const { cacheImages, cacheImage } = require('./contentful')
const chalk = require('chalk')

const renderContentPage = async (
	page,
	pagePath,
	template,
	createPage,
	context,
) => {
	console.log(chalk.yellow('renderContentPage'), pagePath)

	// Render requested page
	await createPage({
		path: pagePath,
		component: path.join(process.cwd(), 'src', 'page', `${template}.tsx`),
		context: {
			...context,
			page,
			pagePath,
		},
	})
}

const blankToUndefined = (s) =>
	s === null || (typeof s === 'string' && s.length === 0) ? undefined : s

exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const {
		data: { pages },
		errors,
	} = await graphql(`
		query PagesQuery {
			pages: allFile(
				filter: {
					sourceInstanceName: { eq: "pages" }
					extension: { eq: "md" }
					relativeDirectory: { eq: "" }
				}
			) {
				edges {
					node {
						id
						name
						relativeDirectory
						relativePath
						remark: childMarkdownRemark {
							htmlAst
							frontmatter {
								title
								subtitle
								noheadline
								date
								abstract
								card
								lang
							}
							headings {
								id
								depth
								value
							}
						}
					}
				}
			}
		}
	`)
	if (errors) {
		throw errors
	}

	const findPage = (name) => {
		const { node: Page } = pages.edges.find(
			({ node: { relativePath } }) => relativePath === name,
		)
		if (Page === undefined) {
			throw new Error(`Failed to locate ${name}!`)
		}
		return Page
	}

	const parsePageMarkdown = async (page) => {
		const { remark, ...rest } = page
		return {
			...rest,
			remark: {
				...remark,
				frontmatter: {
					...remark.frontmatter,
					// Cache twitter cards
					card:
						blankToUndefined(remark.frontmatter.card) !== undefined
							? (
									await cacheImage(
										remark.frontmatter.card,
										rest.relativeDirectory,
									)
							  ).replace(/^\/\//, 'https://')
							: undefined,
				},
				htmlAst: await cacheImages(remark.htmlAst, rest.relativeDirectory),
			},
		}
	}

	const Footer = await parsePageMarkdown(findPage('Footer.md'))

	await renderContentPage(
		await parsePageMarkdown(findPage('About.md')),
		'/',
		'default',
		createPage,
		{
			Footer,
		},
	)
	await renderContentPage(
		await parsePageMarkdown(findPage('Communities.md')),
		'/communities',
		'default',
		createPage,
		{ Footer },
	)
	await renderContentPage(
		await parsePageMarkdown(findPage('Talks.md')),
		'/talks',
		'default',
		createPage,
		{ Footer },
	)
	// Render blog posts
	const {
		data: { posts },
	} = await graphql(`
		query PagesQuery {
			posts: allFile(
				filter: {
					sourceInstanceName: { eq: "pages" }
					extension: { eq: "md" }
					relativeDirectory: { regex: "/^post/" }
				}
			) {
				edges {
					node {
						id
						name
						relativeDirectory
						relativePath
						remark: childMarkdownRemark {
							htmlAst
							frontmatter {
								title
								subtitle
								noheadline
								date
								abstract
								card
								lang
							}
							headings {
								id
								depth
								value
							}
						}
					}
				}
			}
		}
	`)
	await Promise.all(
		posts.edges.map(async ({ node: page }) =>
			renderContentPage(
				await parsePageMarkdown(page),
				`/${page.relativePath.replace(/^post\//, '').replace('.md', '')}`,
				'post',
				createPage,
				{
					page,
					Footer,
				},
			),
		),
	)
	// Post archive
	await renderContentPage(
		await parsePageMarkdown(findPage('Archive.md')),
		'/archive',
		'archive',
		createPage,
		{
			Footer,
			pages: await Promise.all(
				posts.edges.map(async ({ node: page }) => parsePageMarkdown(page)),
			),
		},
	)

	// Render Tweets
	const {
		data: { tweets },
	} = await graphql(`
		query TweetsQuery {
			tweets: allFile(
				filter: {
					sourceInstanceName: { eq: "pages" }
					extension: { eq: "md" }
					relativeDirectory: { eq: "twitter" }
				}
			) {
				edges {
					node {
						id
						name
						relativeDirectory
						relativePath
						remark: childMarkdownRemark {
							htmlAst
							frontmatter {
								favorite_count
								retweet_count
								created_at
								lang
								video_aspect_ratio
							}
						}
					}
				}
			}
		}
	`)
	const tweetCount = tweets.edges.length
	await Promise.all(
		tweets.edges.map(async ({ node: status }) =>
			renderContentPage(
				await parsePageMarkdown(status),
				`/twitter/status/${status.name}`,
				'twitter-status',
				createPage,
				{
					status,
					Footer,
					tweetCount,
				},
			),
		),
	)
	// Twitter archive
	const {
		data: { status },
	} = await graphql(`
		query TweetsQuery {
			status: allFile(
				filter: {
					sourceInstanceName: { eq: "pages" }
					extension: { eq: "md" }
					relativeDirectory: { eq: "twitter" }
				}
			) {
				edges {
					node {
						name
						remark: childMarkdownRemark {
							frontmatter {
								created_at
								full_text
								favorite_count
							}
						}
					}
				}
			}
		}
	`)
	await renderContentPage(
		undefined,
		'/twitter/archive',
		'twitter-archive',
		createPage,
		{
			Footer,
			status: status.edges.map(({ node }) => ({
				name: node.name,
				created_at: node.remark.frontmatter.created_at,
				full_text: node.remark.frontmatter.full_text,
				favorite_count: parseInt(node.remark.frontmatter.favorite_count, 10),
			})),
			tweetCount,
		},
	)

	// Special page: social card default
	await createPage({
		path: '/social-card',
		component: path.join(process.cwd(), 'src', 'page', `social.tsx`),
	})
}
