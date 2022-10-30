import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
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
	margin: 4rem 0;
	box-shadow: 0 4px 10px 1px rgb(0 0 0 / 10%);
	padding: 2.5rem 2rem 1.5rem 2rem;
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
	hr {
		border: 0;
		border-top: 1px solid #ccc;
	}
`

const Footer = styled.footer`
	font-size: 80%;
	margin-top: 2rem;
	color: #666;
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
		tweetCount: number
	}
	location: {
		href?: string
	}
}) => {
	const { created_at, lang, favorite_count, retweet_count } =
		pageContext.status.remark.frontmatter
	const date = created_at
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			description={`Archived version of Tweet ${pageContext.status.name}`}
			title={`Twitter status ${pageContext.status.name} from ${format(
				new Date(date),
				'd. MMMM yyyy',
			)}`}
			lang={lang}
			mainClass="twitter-status"
		>
			<article>
				<Card>
					{pageContext.status.remark?.htmlAst !== undefined &&
						renderHtmlAstToReact(pageContext.status.remark.htmlAst)}
					<hr />
					<dl>
						<dt>
							<abbr title={`${favorite_count} favorites`}>⭐</abbr>
						</dt>
						<dd>{favorite_count}</dd>
						<dt>
							<abbr title={`${retweet_count} retweets`}>🔁</abbr>
						</dt>
						<dd>{retweet_count}</dd>
						<dt>
							<abbr title="Date posted">🗓</abbr>
						</dt>
						<dd>
							<time dateTime={date}>
								{format(new Date(date), 'd. MMMM yyyy, HH:MM:SS')}
							</time>
						</dd>
						<dt>
							<abbr title="Tweet ID">#</abbr>
						</dt>
						<dd>{pageContext.status.name}</dd>
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
						{pageContext.status.name}, I&apos;ve tweeted on{' '}
						<time dateTime={date}>
							{format(new Date(date), 'd. MMMM yyyy')}
						</time>
						.
					</p>
					<p>
						Find the rest of my {pageContext.tweetCount} tweets in my{' '}
						<a href="/twitter/archive">Twitter Archive</a>.
					</p>
				</Footer>
			</article>
		</PageTemplate>
	)
}

export default TwitterStatusPage
