import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Comments } from '../components/Comments'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'

export const query = graphql`
	query PostPageQuery {
		site {
			siteMetadata {
				title
				tagLine
				description
				gitHubUrl
				siteUrl
				twitter
				defaultCard
			}
		}
	}
`

const Footer = styled.footer`
	margin: 4rem 0;
	section {
		margin: 4rem 0;
	}
`

const PostPage = ({
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
		Footer: Page
		pagePath: string
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
			mainClass="post"
		>
			<article>
				<Title {...pageContext.page.remark.frontmatter} />
				{pageContext.page.remark?.htmlAst !== undefined &&
					renderHtmlAstToReact(pageContext.page.remark.htmlAst)}
				<Footer>
					<Comments
						page={pageContext.page}
						siteUrl={data.site.siteMetadata.siteUrl}
					/>
				</Footer>
			</article>
		</PageTemplate>
	)
}

export default PostPage
