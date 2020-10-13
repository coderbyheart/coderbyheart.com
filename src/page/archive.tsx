import React from 'react'
import { SiteMetaData, PageContext, Page } from '../types'
import PageTemplate from '../templates/page'
import { Title } from '../design/Title'
import { graphql, Link } from 'gatsby'

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

const PageLink = ({ page }: { page: Page }) => (
	<Link to={`/${page.name}`}>{page.remark.frontmatter.title}</Link>
)

const Archive = ({
	data,
	pageContext,
}: {
	data: {
		site: {
			siteMetadata: SiteMetaData
		}
	}
	pageContext: PageContext
}) => (
	<PageTemplate siteMetadata={data.site.siteMetadata} pageContext={pageContext}>
		{pageContext.page.remark.frontmatter.noheadline !== true && (
			<Title page={pageContext.page} />
		)}
		{pageContext.pages
			.filter(({ relativeDirectory }) => relativeDirectory === 'post')
			.map((p, i) => (
				<PageLink key={i} page={p} />
			))}
	</PageTemplate>
)

export default Archive
