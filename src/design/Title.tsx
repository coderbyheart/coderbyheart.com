import React from 'react'
import { Page } from '../site'
import styled from 'styled-components'
import { formatDistanceToNow } from 'date-fns'

const Subtitle = styled.div`
	span + time {
		:before {
			content: '·';
			padding: 0 0.5rem;
		}
	}
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-thin);
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column-reverse;
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
		<Wrapper>
			<h1>{page.remark.frontmatter.title}</h1>
			{subtitle.length > 0 && <Subtitle>{subtitle}</Subtitle>}
		</Wrapper>
	)
}
