import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../design/settings'
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

const Info = styled.aside`
	display: flex;
	flex-wrap: wrap;
	font-size: 80%;
	margin: 1rem 0 0 0;
	@media (min-width: ${breakpoints.content}) {
		margin: 1rem 0 0 1.5rem;
	}
	abbr[title] {
		margin-right: 0.5rem;
		white-space: nowrap;
		&:last-child() {
			margin-right: 0;
		}
		text-decoration: none;
	}
`

const Tweet = styled.section`
	margin-top: 4rem;
	@media (min-width: ${breakpoints.content}) {
		margin: 4rem 0 0 0;
		box-shadow: 0 4px 10px 1px rgb(0 0 0 / 10%);
		padding: 2.5rem 2rem;
	}
	picture img {
		margin-top: 2rem;
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
		markdown: any
	}
	location: {
		href?: string
	}
}) => {
	const { created_at, lang, favorite_count, retweet_count } =
		pageContext.status.remark.frontmatter
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			description={`Archived version of Tweet ${pageContext.status.name}`}
			title={`Twitter status ${pageContext.status.name} from ${format(
				new Date(created_at),
				'd. MMMM yyyy',
			)}`}
			lang={lang}
			mainClass="twitter-status"
		>
			<article>
				<Tweet>
					{renderHtmlAstToReact(
						pageContext.markdown,
						() =>
							pageContext.status.remark.frontmatter.video_aspect_ratio ?? 1.5,
					)}
				</Tweet>
				<Info>
					<abbr title={`${favorite_count} favorites`}>⭐ {favorite_count}</abbr>
					<abbr title={`${retweet_count} retweets`}>🔁 {retweet_count}</abbr>
					<abbr title="Date posted">
						🗓{' '}
						<time dateTime={created_at}>
							{format(new Date(created_at), 'd. MMMM yyyy, HH:MM:SS')}
						</time>
					</abbr>
					<abbr title="Tweet ID">#{pageContext.status.name}</abbr>
				</Info>
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
						<time dateTime={created_at}>
							{format(new Date(created_at), 'd. MMMM yyyy')}
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