import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'

export const Ul = styled.ul`
	padding-left: 1rem;
`

export const Li = styled.li`
	margin-bottom: 0.25rem;
	display: flex;
	align-items: center;
	svg {
		height: 16px;
		width: 16px;
		margin-right: 0.5rem;
		flex-shrink: 0;
	}
`

const Star = styled(Li)`
	list-style-type: none;
	&:before {
		content: '⭐';
		padding-right: 0.25rem;
	}
`

const RetweetCount = styled.span`
	margin-right: 0.5rem;
`

export const Link = styled.a`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

export const query = graphql`
	query TwitterArchiveQuery {
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

export type Status = {
	id: string
	created_at: string
	full_text: string
	favorite_count: number
}

const TwitterArchive = ({
	data,
	pageContext,
}: {
	data: {
		site: {
			siteMetadata: SiteMetaData
		}
	}
	pageContext: {
		numTweets: number
		pagePath: string
		Footer: Page
		popularTweets: Status[]
		minStars: number
		years: Record<string, number>[]
	}
}) => {
	const subtitle = `My entire Twitter timeline of ${pageContext.numTweets} tweets, archived`

	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			description={subtitle}
			lang={'en'}
			title={'Twitter archive'}
			mainClass="twitter-archive"
		>
			<article>
				<Title
					title={'Twitter archive'}
					subtitle={subtitle}
					date={'2022-10-28T00:00:00Z'}
				/>
				<p>
					In October 2022 <a href="/leaving-twitter">I left Twitter</a>. This is
					my entire tweet archive (excluding retweets).
				</p>
				<PopularTweets
					tweets={pageContext.popularTweets}
					minStars={pageContext.minStars}
				/>
				<h2>Tweets by year</h2>
				<TweetYears years={pageContext.years} />
			</article>
		</PageTemplate>
	)
}

const PopularTweets: FC<{ tweets: Status[]; minStars: number }> = ({
	tweets,
	minStars,
}) => (
	<>
		<h2>The {tweets.length} most popular Tweets</h2>
		<p>These tweets have received {minStars} or more likes.</p>
		<Ul>
			{tweets.map(({ id, favorite_count, created_at, full_text }) => (
				<Star key={id}>
					<RetweetCount>{favorite_count}</RetweetCount>
					<Link
						href={`/twitter/status/${id}`}
						title={`Twitter status ${id} from ${format(
							new Date(created_at),
							'd. MMMM yyyy',
						)}`}
					>
						{full_text}
					</Link>
				</Star>
			))}
		</Ul>
	</>
)

const TweetYears: FC<{ years: Record<string, number>[] }> = ({ years }) => (
	<Ul>
		{Object.entries(years).map(([year, count]) => (
			<Li key={year}>
				<a
					href={`/twitter/archive/${year}`}
					title={`Tweets in the year ${year}`}
				>
					{year}: {count} Tweets
				</a>
			</Li>
		))}
	</Ul>
)

export default TwitterArchive
