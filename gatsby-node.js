require('ts-node').register({ files: true })
const path = require('path')
const { cacheImages } = require('./contentful')

const renderContentPage = async (
	name,
	pagePath,
	template,
	createPage,
	graphql,
) => {
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

	// Find requested page
	const page = pages.data.allFile.edges.find(
		({ node: { relativePath } }) => name === relativePath,
	)

	// Render requested page
	await createPage({
		path: pagePath,
		component: path.join(process.cwd(), 'src', 'templates', `${template}.tsx`),
		context: {
			page: {
				remark: {
					...page.node.childMarkdownRemark,
					htmlAst: await cacheImages(page.node.childMarkdownRemark.htmlAst),
				},
			},
			pages: await Promise.all(
				pages.data.allFile.edges.map(
					async ({ node: { childMarkdownRemark, ...rest } }) => ({
						remark: {
							...childMarkdownRemark,
							htmlAst: await cacheImages(childMarkdownRemark.htmlAst),
						},
						...rest,
					}),
				),
			),
			pagePath,
			template,
		},
	})
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
	await renderContentPage('About.md', '/', 'page', createPage, graphql)
	await renderContentPage(
		'Communities.md',
		'/communities',
		'page',
		createPage,
		graphql,
	)
	await renderContentPage('Talks.md', '/talks', 'page', createPage, graphql)
}
