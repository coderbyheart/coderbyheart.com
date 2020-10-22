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
	const pages = await graphql(`
		query PagesQuery {
			allFile(
				filter: { sourceInstanceName: { eq: "pages" }, extension: { eq: "md" } }
			) {
				edges {
					node {
						id
						name
						relativeDirectory
						relativePath
						childMarkdownRemark {
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
	if (pages.errors) {
		throw pages.errors
	}

	const findPage = (name) => {
		const { node: Page } = pages.data.allFile.edges.find(
			({ node: { relativePath } }) => relativePath === name,
		)
		if (Page === undefined) {
			throw new Error(`Failed to locate ${name}!`)
		}
		return Page
	}

	const parsePageMarkdown = async (page) => {
		const { childMarkdownRemark, ...rest } = page
		return {
			...rest,
			remark: {
				...childMarkdownRemark,
				frontmatter: {
					...childMarkdownRemark.frontmatter,
					// Cache twitter cards
					card:
						blankToUndefined(childMarkdownRemark.frontmatter.card) !== undefined
							? (
									await cacheImage(
										childMarkdownRemark.frontmatter.card,
										rest.relativeDirectory,
									)
							  ).replace(/^\/\//, 'https://')
							: undefined,
				},
				htmlAst: await cacheImages(
					childMarkdownRemark.htmlAst,
					rest.relativeDirectory,
				),
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
	await Promise.all(
		pages.data.allFile.edges
			.filter(({ node: { relativeDirectory } }) => relativeDirectory === 'post')
			.map(async ({ node: page }) =>
				renderContentPage(
					await parsePageMarkdown(page),
					`/${page.name}`,
					'post',
					createPage,
					{
						page,
						Footer,
					},
				),
			),
	)
	await renderContentPage(
		await parsePageMarkdown(findPage('Archive.md')),
		'/archive',
		'archive',
		createPage,
		{
			Footer,
			pages: await Promise.all(
				pages.data.allFile.edges.map(async ({ node: page }) =>
					parsePageMarkdown(page),
				),
			),
		},
	)
	// Special page: social card default
	await createPage({
		path: '/social-card',
		component: path.join(process.cwd(), 'src', 'page', `social.tsx`),
	})
}
