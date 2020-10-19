import React from 'react'
import { SiteMetaData, Page } from '../site'
import PageTemplate from '../templates/page'
import { Title } from '../design/Title'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

export const query = graphql`
	query ArchiveQuery {
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

const P = styled.p`
	margin-top: 0;
`

const Entry = ({
	page,
	yearCount,
}: {
	page: Page
	yearCount: { year: number }
}) => {
	const entryYear = new Date(page.remark.frontmatter.date).getFullYear()
	const showYear = yearCount.year !== entryYear
	yearCount.year = entryYear
	return (
		<>
			{showYear && <h2>{entryYear}</h2>}
			<Link to={`/${page.name}`}>{page.remark.frontmatter.title}</Link>
			<P>{page.remark.frontmatter.abstract}</P>
		</>
	)
}

const Archive = ({
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
		pages: Page[]
		pagePath: string
		Footer: Page
	}
}) => {
	const c = {
		lastYear: -1,
	}
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			pageContext={pageContext}
		>
			{pageContext.page.remark.frontmatter.noheadline !== true && (
				<Title page={pageContext.page} />
			)}
			{pageContext.pages
				.filter(({ relativeDirectory }) => relativeDirectory === 'post')
				.sort((a, b) =>
					b.remark.frontmatter.date?.localeCompare(a.remark.frontmatter.date),
				)
				.map((p, i) => (
					<Entry key={i} page={p} yearCount={c} />
				))}
		</PageTemplate>
	)
}

export default Archive
