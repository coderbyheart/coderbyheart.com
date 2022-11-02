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
			tweets: allTweet {
				edges {
					node {
						id
						remark: childMarkdownRemark {
							htmlAst
							frontmatter {
								favorite_count
								retweet_count
								created_at
								lang
								video_aspect_ratio
								full_text
							}
						}
					}
				}
			}
		}
	`)
	const tweetCount = tweets.edges.length
	await Promise.all(
		tweets.edges.map(async ({ node: status }) => {
			const statusPath = `/twitter/status/${status.id}`
			console.log(chalk.yellow('renderStatus'), statusPath)
			const { remark, ...rest } = status
			await createPage({
				path: statusPath,
				component: path.join(
					process.cwd(),
					'src',
					'page',
					`twitter-status.tsx`,
				),
				context: {
					markdown: remark.htmlAst,
					status,
					Footer,
					tweetCount,
				},
			})
		}),
	)
	// Twitter archive
	const tweetArchive = tweets.edges.map(({ node }) => ({
		id: node.id,
		created_at: node.remark.frontmatter.created_at,
		full_text: node.remark.frontmatter.full_text,
		favorite_count: parseInt(node.remark.frontmatter.favorite_count, 10),
	}))
	const minStars = 50
	const years = tweetArchive.reduce((years, { created_at }) => {
		const year = created_at.slice(0, 4)
		return {
			...years,
			[year]: (years[year] ?? 0) + 1,
		}
	}, {})

	await renderContentPage(
		undefined,
		'/twitter/archive',
		'twitter-archive',
		createPage,
		{
			Footer,
			status: tweetArchive,
			numTweets: tweetArchive.length,
			minStars,
			popularTweets: tweetArchive
				.filter(({ favorite_count }) => favorite_count > minStars)
				.sort(({ favorite_count: c1 }, { favorite_count: c2 }) => c2 - c1),
			years,
		},
	)
	for (const year of Object.keys(years)) {
		await renderContentPage(
			undefined,
			`/twitter/archive/${year}`,
			'twitter-archive-year',
			createPage,
			{
				Footer,
				year,
				numTweetsYear: tweetArchive.reduce(
					(tweetsPerYear, { created_at }) =>
						created_at.startsWith(year) ? tweetsPerYear + 1 : tweetsPerYear,
					0,
				),
				tweetsPerMonth: tweetArchive
					.filter(({ created_at }) => created_at.startsWith(`${year}`))
					.reduce((months, { created_at }) => {
						const month = created_at.slice(0, 7)
						return {
							...months,
							[month]: (months[month] ?? 0) + 1,
						}
					}, {}),
			},
		)
		for (const month of Object.keys(
			tweetArchive
				.filter(({ created_at }) => created_at.startsWith(`${year}`))
				.reduce((months, { created_at }) => {
					const month = created_at.slice(0, 7)
					return {
						...months,
						[month]: true,
					}
				}, {}),
		)) {
			await renderContentPage(
				undefined,
				`/twitter/archive/${month.replace('-', '/')}`,
				'twitter-archive-year-month',
				createPage,
				{
					Footer,
					status: tweetArchive.filter(({ created_at }) =>
						created_at.startsWith(month),
					),
					month,
				},
			)
		}
	}

	// Special page: social card default
	await createPage({
		path: '/social-card',
		component: path.join(process.cwd(), 'src', 'page', `social.tsx`),
	})
}
