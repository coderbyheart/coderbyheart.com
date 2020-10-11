import React from 'react'
import { graphql } from 'gatsby'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'
import { SiteMetaData, Page, GatsbyLocation } from './types'
import { Head } from '../design/Head'
import { Header } from '../design/Header'
import { Content } from '../design/Content'
import { Footer } from '../design/Footer'
import styled from 'styled-components'
import { breakpoints } from '../design/settings'

export const query = graphql`
	query PageTemplateQuery {
		site {
			siteMetadata {
				title
				tagLine
				description
				gitHubUrl
			}
		}
	}
`

const Main = styled.main`
	padding: 1rem;
	@media (min-width: ${breakpoints.content}) {
		padding: 0;
		margin: 4rem auto;
	}
	max-width: var(--max-width);
`

const PageTemplate = (data: {
	data: {
		site: {
			siteMetadata: SiteMetaData
		}
	}
	pageContext: {
		page: Page
		pages: Page[]
	}
	location: GatsbyLocation
}) => {
	const findPageByRelativePath = (search: string): Page => {
		const p = data.pageContext.pages.find(
			({ relativePath }) => relativePath === search,
		)
		if (p === undefined) {
			throw new Error(`Failed to locate page ${search}!`)
		}
		return p
	}
	const footerContent = findPageByRelativePath('Footer.md')
	return (
		<>
			<Head
				siteMetaData={data.data.site.siteMetadata}
				pageTitle={data.pageContext.page.remark.frontmatter.title}
			/>
			<Header siteMetaData={data.data.site.siteMetadata} location={location} />
			<Main>
				<Content>
					{data.pageContext.page.remark.frontmatter.noheadline !== true && (
						<h1>
							{data.pageContext.page.remark.frontmatter.subtitle && (
								<>
									<small>
										{data.pageContext.page.remark.frontmatter.subtitle}
									</small>
									<br />
								</>
							)}
							{data.pageContext.page.remark.frontmatter.title}
						</h1>
					)}

					{data.pageContext.page.remark?.htmlAst !== undefined &&
						renderHtmlAstToReact(data.pageContext.page.remark.htmlAst)}
				</Content>
			</Main>
			<Footer
				siteMetaData={data.data.site.siteMetadata}
				content={footerContent}
			/>
		</>
	)
}

export default PageTemplate
