import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React, { FC } from 'react'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'
import { Li, Link, Status, Ul } from './twitter-archive'

export const query = graphql`
	query TwitterArchiveMonthQuery {
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

const TwitterArchiveMonth = ({
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
		month: string // '2022-12'
	}
}) => {
	const monthFormatted = format(
		new Date(`${pageContext.month}-02T00:00:00Z`),
		'MMMM yyyy',
	)
	const year = pageContext.month.slice(0, 4)
	const title = `My Twitter archive of ${monthFormatted}`
	const subtitle = `In ${monthFormatted} I've tweeted ${pageContext.status.length} times`

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
					my tweet archive for {monthFormatted}.
				</p>
				<h2>Tweets</h2>
				<Tweets tweets={pageContext.status} month={pageContext.month} />
				<nav>
					<a href="/twitter/archive">Twitter Archive</a> &middot;{' '}
					<a href={`/twitter/archive/${year}`}>{year}</a>
				</nav>
			</article>
		</PageTemplate>
	)
}

const Tweets: FC<{ tweets: Status[]; month: string }> = ({ tweets, month }) => (
	<Ul>
		{tweets
			.filter(({ created_at }) => created_at.startsWith(month))
			.map(({ id, created_at, full_text }) => (
				<Li key={id}>
					<Link
						href={`/twitter/status/${id}`}
						title={`Twitter status ${id} from ${format(
							new Date(created_at),
							'd. MMMM yyyy',
						)}`}
					>
						{full_text}
					</Link>
				</Li>
			))}
	</Ul>
)

export default TwitterArchiveMonth
