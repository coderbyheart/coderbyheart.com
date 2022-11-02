import { graphql } from 'gatsby'
import React, { FC } from 'react'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'
import { Li, Ul } from './twitter-archive'

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
		Footer: Page
		year: number
		numTweetsYear: number
		tweetsPerMonth: Record<string, number>
	}
}) => {
	const title = `My Twitter archive of ${pageContext.year}`
	const subtitle = `In ${pageContext.year} I've tweeted ${pageContext.numTweetsYear} times`

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
				<TweetMonths tweetsPerMonth={pageContext.tweetsPerMonth} />
				<nav>
					<a href="/twitter/archive">Twitter Archive</a>
				</nav>
			</article>
		</PageTemplate>
	)
}

const TweetMonths: FC<{
	tweetsPerMonth: Record<string, number>
}> = ({ tweetsPerMonth }) => (
	<Ul>
		{Object.entries(tweetsPerMonth)
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

export default TwitterArchiveYear
