import React from 'react'
import { Page } from '../types'
import styled from 'styled-components'
import { formatDistanceToNow } from 'date-fns'

const Subtitle = styled.span`
	span + time {
		:before {
			content: '·';
			padding: 0 0.5rem;
		}
	}
`

export const Title = ({ page }: { page: Page }) => {
	const subtitle = []
	if (page.remark.frontmatter.subtitle)
		subtitle.push(<span>{page.remark.frontmatter.subtitle}</span>)
	if (page.remark.frontmatter.date)
		subtitle.push(
			<time
				dateTime={page.remark.frontmatter.date}
				title={new Date(page.remark.frontmatter.date).toLocaleDateString()}
			>
				{formatDistanceToNow(new Date(page.remark.frontmatter.date), {
					addSuffix: true,
				})}
			</time>,
		)
	return (
		<h1>
			{subtitle.length > 0 && (
				<Subtitle>
					<small>{subtitle}</small>
					<br />
				</Subtitle>
			)}
			{page.remark.frontmatter.title}
		</h1>
	)
}
