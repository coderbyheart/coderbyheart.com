import { graphql } from 'gatsby'
import React from 'react'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'
import { pagePathToClass } from '../templates/utils/pagePathToClass'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'

export const query = graphql`
	query DefaultPageQuery {
		site {
			siteMetadata {
				title
				tagLine
				description
				gitHubUrl
				twitter
				defaultCard
			}
		}
	}
`

const DefaultPage = ({
	data,
	pageContext,
}: {
	data: {
		site: {
			siteMetadata: SiteMetaData
		}
	}
	pageContext: {
		page: Page
		pagePath: string
		Footer: Page
	}
}) => {
	const { card, abstract, lang, title } = pageContext.page.remark.frontmatter
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			card={card}
			description={abstract}
			lang={lang}
			title={title}
			mainClass={pagePathToClass(pageContext.pagePath)}
		>
			{pageContext.page.remark.frontmatter.noheadline !== true && (
				<Title {...pageContext.page.remark.frontmatter} />
			)}
			{pageContext.page.remark?.htmlAst !== undefined &&
				renderHtmlAstToReact(pageContext.page.remark.htmlAst)}
		</PageTemplate>
	)
}

export default DefaultPage
