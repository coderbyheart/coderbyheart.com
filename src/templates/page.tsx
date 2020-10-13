import React from 'react'
import { graphql } from 'gatsby'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'
import { SiteMetaData, Page } from './types'
import { Head } from '../design/Head'
import { Header } from '../design/Header'
import { Content } from '../design/Content'
import { Footer, avatarUrl } from '../design/Footer'
import styled from 'styled-components'
import { breakpoints } from '../design/settings'
import classNames from 'classnames'

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

const pagePathToClass = (pagePath: string): string => {
	const s = pagePath.replace(/\//, ' ').trim().split(' ').join('-')
	if (s === '') return 'home'
	return s
}

const Main = styled.main`
	padding: 1rem;
	@media (min-width: ${breakpoints.content}) {
		padding: 0;
		margin: 4rem auto;
	}
	max-width: var(--max-width);
	&.home ${Content} {
		:before {
			display: inline-block;
			content: '';
			background-image: url('${avatarUrl}');
			width: 150px;
			height: 150px;
			border-radius: 100%;
			border: 2px solid var(--heart-color);
			margin-top: 3rem;
			margin-left: calc((100vw / 2) - (154px / 2) - 1rem);
			box-shadow: 0px 0px 15px 3px #00000057;
			@media (min-width: ${breakpoints.content}) {
				margin-top: 0;
				margin-left: calc(${breakpoints.content} / 2 - 154px / 2);
			}
		}
	}
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
		pagePath: string
		template: string
	}
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
			<Header siteMetaData={data.data.site.siteMetadata} />
			<Main
				className={classNames([
					data.pageContext.template,
					pagePathToClass(data.pageContext.pagePath),
				])}
			>
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
