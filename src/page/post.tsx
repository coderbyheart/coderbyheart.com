import React from 'react'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'
import { Title } from '../design/Title'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Comments } from '../components/Comments'
import { breakpoints } from '../design/settings'

export const query = graphql`
	query PostPageQuery {
		site {
			siteMetadata {
				title
				tagLine
				description
				gitHubUrl
				siteUrl
			}
		}
	}
`

const ShareButton = styled.a`
	background-color: var(--highlight-color);
	color: var(--background-color) !important;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	text-decoration: none;
	& + & {
		margin-left: 1rem;
	}
`

const Share = styled.section`
	display: none;
	@media (min-width: ${breakpoints.content}) {
		display: block;
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
	location,
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
	location: {
		href?: string
	}
}) => {
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			pageContext={pageContext}
		>
			<article>
				<Title page={pageContext.page} />
				{pageContext.page.remark?.htmlAst !== undefined &&
					renderHtmlAstToReact(pageContext.page.remark.htmlAst)}
				<Footer>
					<Share>
						<h2>Share</h2>
						<ShareButton
							href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(
								pageContext.page.remark.frontmatter.title,
							)}&url=${encodeURIComponent(location.href ?? '')}`}
							target="_blank"
							rel="noreferrer noopener"
							aria-label="Share on Twitter"
						>
							Twitter
						</ShareButton>

						<ShareButton
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
								location.href ?? '',
							)}&title=${encodeURIComponent(
								pageContext.page.remark.frontmatter.title,
							)}&summary=${encodeURIComponent(
								pageContext.page.remark.frontmatter.abstract,
							)}&source=${encodeURIComponent(location.href ?? '')}`}
							target="_blank"
							rel="noreferrer noopener"
							aria-label="Share on LinkedIn"
						>
							LinkedIn
						</ShareButton>
					</Share>
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
