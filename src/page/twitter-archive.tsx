import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Title } from '../design/Title'
import { Page, SiteMetaData } from '../site'
import PageTemplate from '../templates/page'

const Ul = styled.ul`
	padding-left: 1rem;
`

const Li = styled.li`
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

const Link = styled.a`
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

const popLikeLimit = 50

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
		status: {
			name: string
			created_at: string
			full_text: string
			favorite_count: number
		}[]
		pagePath: string
		Footer: Page
		tweetCount: number
	}
}) => {
	const subtitle = `My entire Twitter timeline of ${pageContext.tweetCount} tweets, archived`
	const popular = pageContext.status.filter(
		({ favorite_count }) => favorite_count > popLikeLimit,
	)
	let lastMonth: string | undefined = undefined
	return (
		<PageTemplate
			siteMetadata={data.site.siteMetadata}
			Footer={pageContext.Footer}
			description={subtitle}
			lang={'en'}
			title={'Twitter Archive'}
			mainClass="twitter-archive"
		>
			<article>
				<Title
					title={'Twitter Archive'}
					subtitle={subtitle}
					date={'2022-10-28T00:00:00Z'}
				/>
				<p>
					In October 2022 <a href="/leaving-twitter">I left Twitter</a>. This is
					my entire tweet archive.
				</p>
				<h2>The {popular.length} most popular Tweets</h2>
				<p>These tweets have received {popLikeLimit} or more likes.</p>
				<Ul>
					{popular
						.sort(({ favorite_count: c1 }, { favorite_count: c2 }) => c2 - c1)
						.map(({ name, favorite_count, created_at, full_text }) => (
							<Star key={name}>
								{favorite_count}{' '}
								<Link
									href={`/twitter/status/${name}`}
									title={`Twitter status ${name} from ${format(
										new Date(created_at),
										'd. MMMM yyyy',
									)}`}
								>
									{full_text}
								</Link>
							</Star>
						))}
				</Ul>
				<h2>Tweets by months</h2>
				{pageContext.status
					.sort(({ created_at: t1 }, { created_at: t2 }) =>
						t2.localeCompare(t1),
					)
					.map(({ name, created_at }) => {
						const month = format(new Date(created_at), 'MMMM yyyy')
						const els = []
						if (lastMonth !== month) {
							els.push(<h3 key={month}>{month}</h3>)
						}
						lastMonth = month
						els.push(
							<React.Fragment key={name}>
								<a
									key={name}
									href={`/twitter/status/${name}`}
									title={`Twitter status ${name} from ${format(
										new Date(created_at),
										'd. MMMM yyyy',
									)}`}
								>
									{name}
								</a>
								<br />
							</React.Fragment>,
						)
						return els
					})}
			</article>
		</PageTemplate>
	)
}

export default TwitterArchive
