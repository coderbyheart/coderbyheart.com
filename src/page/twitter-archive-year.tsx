import { graphql } from 'gatsby'
import React, { FC } from 'react'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'
import { Li, Status, Ul } from './twitter-archive'

export const query = graphql`
	query TwitterArchiveYearQuery {
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

const TwitterArchiveYear = ({
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
		Footer: Page
		year: number
	}
}) => {
	const title = `My Twitter archive of ${pageContext.year}`
	const subtitle = `In ${pageContext.year} I've tweeted ${pageContext.status.length} times`

	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			description={subtitle}
			lang={'en'}
			title={title}
			mainClass="twitter-archive"
		>
			<article>
				<Title
					title={title}
					subtitle={subtitle}
					date={'2022-10-28T00:00:00Z'}
				/>
				<p>
					In October 2022 <a href="/leaving-twitter">I left Twitter</a>. This is
					my tweet archive for {pageContext.year}.
				</p>
				<h2>Tweets by month for {`${pageContext.year}`}</h2>
				<TweetMonths tweets={pageContext.status} year={pageContext.year} />
				<nav>
					<a href="/twitter/archive">Twitter Archive</a>
				</nav>
			</article>
		</PageTemplate>
	)
}

const TweetMonths: FC<{ tweets: Status[]; year: number }> = ({
	tweets,
	year,
}) => (
	<Ul>
		{Object.entries(tweetMonths(tweets, year))
			.sort(([month1], [month2]) => month2.localeCompare(month1))
			.map(([month, count]) => (
				<Li key={month}>
					<a
						href={`/twitter/archive/${month.replace('-', '/')}`}
						title={`Tweets in the month ${month}`}
					>
						{month}: {count} Tweets
					</a>
				</Li>
			))}
	</Ul>
)

const tweetMonths = (tweets: Status[], year: number): Record<string, number> =>
	tweets
		.filter(({ created_at }) => created_at.startsWith(`${year}`))
		.reduce((months, { created_at }) => {
			const month = created_at.slice(0, 7)
			return {
				...months,
				[month]: (months[month] ?? 0) + 1,
			}
		}, {} as Record<string, number>)

export default TwitterArchiveYear
