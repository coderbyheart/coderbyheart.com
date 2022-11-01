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
`

const Star = styled(Li)`
	list-style-type: none;
	&:before {
		content: '⭐';
		padding-right: 0.25rem;
	}
`

export const Link = styled.a`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-left: 1rem;
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
		status: Status[]
		pagePath: string
		Footer: Page
	}
}) => {
	const subtitle = `My entire Twitter timeline of ${pageContext.status.length} tweets, archived`

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
					my entire tweet archive.
				</p>
				<PopularTweets tweets={pageContext.status} />
				<h2>Tweets by year</h2>
				<TweetYears tweets={pageContext.status} />
			</article>
		</PageTemplate>
	)
}

const popLikeLimit = 50

const PopularTweets: FC<{ tweets: Status[] }> = ({ tweets }) => {
	const popular = tweets.filter(
		({ favorite_count }) => favorite_count > popLikeLimit,
	)
	return (
		<>
			<h2>The {popular.length} most popular Tweets</h2>
			<p>These tweets have received {popLikeLimit} or more likes.</p>
			<Ul>
				{popular
					.sort(({ favorite_count: c1 }, { favorite_count: c2 }) => c2 - c1)
					.map(({ id, favorite_count, created_at, full_text }) => (
						<Star key={id}>
							{favorite_count}{' '}
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
}

const TweetYears: FC<{ tweets: Status[] }> = ({ tweets }) => (
	<Ul>
		{Object.entries(tweetYears(tweets))
			.sort(([year1], [year2]) => year2.localeCompare(year1))
			.map(([year, count]) => (
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

const tweetYears = (tweets: Status[]): Record<string, number> =>
	tweets.reduce((years, { created_at }) => {
		const year = created_at.slice(0, 4)
		return {
			...years,
			[year]: (years[year] ?? 0) + 1,
		}
	}, {} as Record<string, number>)

export default TwitterArchive
