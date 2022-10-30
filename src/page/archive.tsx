import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'

export const query = graphql`
	query ArchiveQuery {
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
			<Link
				to={`/${page.relativePath.replace(/^post\//, '').replace(/\.md$/, '')}`}
			>
				{page.remark.frontmatter.title}
			</Link>
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
	const { card, abstract, lang, title, noheadline } =
		pageContext.page.remark.frontmatter
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			card={card}
			description={abstract}
			lang={lang}
			title={title}
			mainClass="archive"
		>
			{noheadline !== true && (
				<Title {...pageContext.page.remark.frontmatter} />
			)}
			{pageContext.pages
				.filter(({ relativeDirectory }) => relativeDirectory.startsWith('post'))
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
