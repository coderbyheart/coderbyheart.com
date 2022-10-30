import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Title } from '../design/Title'
import { Page, SiteMetaData, TwitterStatus } from '../site'
import PageTemplate from '../templates/page'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'

export const query = graphql`
	query TwitterStatusPageQuery {
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

const Card = styled.section`
	margin-top: 2rem;
	box-shadow: 0 4px 10px 1px rgb(0 0 0 / 10%);
	padding: 2.5rem 2rem;
	dl {
		display: flex;
		font-size: 80%;
	}
	dt {
		margin-right: 0.25rem;
	}
	dd {
		margin-inline-start: 0;
		margin-right: 1rem;
	}
`

const Footer = styled.footer`
	opacity: 0.8;
	font-size: 80%;
	margin-top: 2rem;
	p {
		margin-top: 0;
		margin-bottom: 0;
	}
`

const TwitterStatusPage = ({
	data,
	pageContext,
}: {
	data: {
		site: {
			siteMetadata: SiteMetaData
		}
	}
	pageContext: {
		status: TwitterStatus
		Footer: Page
		pagePath: string
	}
	location: {
		href?: string
	}
}) => {
	const date = pageContext.status.remark.frontmatter.created_at
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			description={`Archived version of Tweet ${pageContext.status.name}`}
			title={`Twitter status #${pageContext.status.name} by @coderbyheart`}
			lang={pageContext.status.remark.frontmatter.lang}
			mainClass="twitter-status"
		>
			<article>
				<Title
					date={date}
					title={`Status #${pageContext.status.name}`}
					subtitle={'From my Twitter archive'}
				/>
				<Card>
					{pageContext.status.remark?.htmlAst !== undefined &&
						renderHtmlAstToReact(pageContext.status.remark.htmlAst)}
					<hr />
					<dl>
						<dt>
							<abbr
								title={`${pageContext.status.remark.frontmatter.favorite_count} favorites`}
							>
								⭐
							</abbr>
						</dt>
						<dd>{pageContext.status.remark.frontmatter.favorite_count}</dd>
						<dt>
							<abbr
								title={`${pageContext.status.remark.frontmatter.retweet_count} retweets`}
							>
								🔁
							</abbr>
						</dt>
						<dd>{pageContext.status.remark.frontmatter.retweet_count}</dd>
					</dl>
				</Card>
				<Footer>
					<p>
						End of October 2022 <a href="/leaving-twitter">I left Twitter</a>.
						You can now follow me on Mastodon:{' '}
						<a
							rel="me"
							href="https://chaos.social/@coderbyheart"
							title="Markus Tacker on Mastodon"
						>
							@coderbyheart@chaos.social
						</a>
						.
					</p>
					<p>
						Above status is an archived version of the status{' '}
						<code>{pageContext.status.name}</code>, tweeted on{' '}
						<time dateTime={date}>
							{format(new Date(date), 'd. MMMM yyyy')}
						</time>
						.
					</p>
				</Footer>
			</article>
		</PageTemplate>
	)
}

export default TwitterStatusPage
