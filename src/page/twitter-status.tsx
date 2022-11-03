import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import ReplyIcon from '../design/corner-down-right.svg'
import RetweetIcon from '../design/repeat.svg'
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
	> img {
		margin-top: 2rem;
	}
	div.gallery {
		margin-top: 2rem;
		display: grid;
		grid-gap: 1px;
		aspect-ratio: 2/1;
		p {
			margin: 0;
			height: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
		}
		&.gallery-2 {
			grid-template-rows: 1fr;
			grid-template-columns: 1fr 1fr;
		}
		&.gallery-3 {
			p:first-child {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 3;
			}
			p:nth-child(2) {
				grid-column-start: 2;
				grid-column-end: 3;
			}

			p:last-child {
				grid-row-start: 2;
				grid-row-end: 3;
			}
		}
		&.gallery-4 {
			grid-template-rows: 1fr 1fr;
			grid-template-columns: 1fr 1fr;
		}
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

const ActionInfo = styled.p`
	display: flex;
	align-items: center;
	svg {
		margin-right: 0.5rem;
	}
	a {
		margin-left: 0.25rem;
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
		tweetCount: number
		markdown: any
	}
	location: {
		href?: string
	}
}) => {
	const {
		created_at,
		lang,
		favorite_count,
		retweet_count,
		retweeted,
		in_reply_to_status_id_str,
		in_reply_to_screen_name,
	} = pageContext.status.remark.frontmatter

	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			description={`Archived version of Tweet ${pageContext.status.id}`}
			title={`Twitter status ${pageContext.status.id} from ${format(
				new Date(created_at),
				'd. MMMM yyyy',
			)}`}
			lang={lang}
			mainClass="twitter-status"
		>
			<article>
				<Tweet>
					{retweeted && (
						<ActionInfo>
							<RetweetIcon className="retweet-icon" />
						</ActionInfo>
					)}
					{in_reply_to_status_id_str && (
						<ActionInfo>
							<ReplyIcon />
							Reply to{' '}
							<a
								href={
									in_reply_to_screen_name === 'coderbyheart'
										? `/twitter/status/${in_reply_to_status_id_str}`
										: `https://twitter.com/${in_reply_to_screen_name}/status/${in_reply_to_status_id_str}`
								}
							>
								{in_reply_to_status_id_str}
							</a>
						</ActionInfo>
					)}
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
					<abbr title="Tweet ID">#{pageContext.status.id}</abbr>
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
						{pageContext.status.id}, I&apos;ve tweeted on{' '}
						<time dateTime={created_at}>
							{format(new Date(created_at), 'd. MMMM yyyy')}
						</time>
						.
					</p>
					<p>
						Find the rest of my {pageContext.tweetCount} tweets in my{' '}
						<a href="/twitter/archive">Twitter archive</a>.
					</p>
				</Footer>
			</article>
		</PageTemplate>
	)
}

export default TwitterStatusPage
