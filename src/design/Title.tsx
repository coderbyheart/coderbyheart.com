import React from 'react'
import { Page } from '../site'
import styled from 'styled-components'
import { format } from 'date-fns'

const Subtitle = styled.div`
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-thin);
`

const Time = styled.time`
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-thin);
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	h1 {
		margin-top: 0.5rem;
	}
`

export const Title = ({ page }: { page: Page }) => (
	<Wrapper>
		<Subtitle>{page.remark.frontmatter.subtitle}</Subtitle>
		<h1>{page.remark.frontmatter.title}</h1>
		<Time dateTime={page.remark.frontmatter.date}>
			{format(new Date(page.remark.frontmatter.date), 'd. MMMM yyyy')}
		</Time>
	</Wrapper>
)
