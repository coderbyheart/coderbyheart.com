import React from 'react'
import { SiteMetaData, Page } from '../site'
import { Head } from '../design/Head'
import { Header } from '../design/Header'
import { Content } from '../design/Content'
import { Footer, avatarUrl } from '../design/Footer'
import styled from 'styled-components'
import { breakpoints } from '../design/settings'
import classNames from 'classnames'
import { pagePathToClass } from './utils/pagePathToClass'
import { blankToUndefined } from './utils/blankToUndefined'

const Main = styled.main`
	padding: 1rem;
	margin-bottom: 4rem;
	@media (min-width: ${breakpoints.content}) {
		padding: 0;
		margin: 4rem auto;
	}
	max-width: var(--max-width);
	&.home ${Content} {
		:before {
			display: inline-block;
			content: '';
			background-image: url('${avatarUrl()}');
			background-size: cover;
			width: 150px;
			height: 150px;
			border-radius: 100%;
			border: 2px solid var(--heart-color);
			margin-top: 3rem;
			margin-bottom: 2rem;
			margin-left: calc((100vw / 2) - (154px / 2) - 1rem);
			box-shadow: 0px 0px 15px 3px #00000057;
			@media (min-width: ${breakpoints.content}) {
				margin-top: 0;
				margin-left: calc(${breakpoints.content} / 2 - 154px / 2);
			}
		}
	}
`

const PageTemplate = ({
	siteMetadata,
	pageContext,
	children,
}: React.PropsWithChildren<{
	siteMetadata: SiteMetaData
	pageContext: {
		pagePath: string
		page: Page
		Footer: Page
	}
}>) => (
	<>
		<Head
			siteMetaData={siteMetadata}
			pageTitle={blankToUndefined(pageContext.page.remark.frontmatter.title)}
			pageDescription={blankToUndefined(
				pageContext.page.remark.frontmatter.abstract,
			)}
			card={blankToUndefined(pageContext.page.remark.frontmatter.card)}
		/>
		<Header siteMetaData={siteMetadata} />
		<Main className={classNames([pagePathToClass(pageContext.pagePath)])}>
			<Content>{children}</Content>
		</Main>
		<Footer siteMetaData={siteMetadata} content={pageContext.Footer} />
	</>
)

export default PageTemplate
