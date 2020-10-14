require('ts-node').register({ files: true })
const path = require('path')
const { cacheImages } = require('./contentful')
const chalk = require('chalk')

const renderContentPage = async (
	name,
	pagePath,
	template,
	createPage,
	pages,
) => {
	console.log(chalk.yellow('renderContentPage'), pagePath)
	// Find requested page
	const page = pages.data.allFile.edges.find(
		({ node: { relativePath } }) => name === relativePath,
	)

	// Render requested page
	await createPage({
		path: pagePath,
		component: path.join(process.cwd(), 'src', 'page', `${template}.tsx`),
		context: {
			page: {
				remark: {
					...page.node.childMarkdownRemark,
					htmlAst: await cacheImages(
						page.node.childMarkdownRemark.htmlAst,
						page.node.relativeDirectory,
					),
				},
			},
			pages: await Promise.all(
				pages.data.allFile.edges.map(
					async ({
						node: { relativeDirectory, childMarkdownRemark, ...rest },
					}) => ({
						remark: {
							...childMarkdownRemark,
							htmlAst: await cacheImages(
								childMarkdownRemark.htmlAst,
								relativeDirectory,
							),
						},
						...rest,
						relativeDirectory,
					}),
				),
			),
			pagePath,
		},
	})
}

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

	await renderContentPage('About.md', '/', 'default', createPage, pages)
	await renderContentPage(
		'Communities.md',
		'/communities',
		'default',
		createPage,
		pages,
	)
	await renderContentPage('Talks.md', '/talks', 'default', createPage, pages)
	// Render blog posts
	await Promise.all(
		pages.data.allFile.edges
			.filter(({ node: { relativeDirectory } }) => relativeDirectory === 'post')
			.map(({ node: { relativePath, name } }) =>
				renderContentPage(
					relativePath,
					`/${name}`,
					'default',
					createPage,
					pages,
				),
			),
	)
	await renderContentPage(
		'Archive.md',
		'/archive',
		'archive',
		createPage,
		pages,
	)
}
