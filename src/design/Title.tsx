import { format } from 'date-fns'
import React from 'react'
import styled from 'styled-components'

const Subtitle = styled.div`
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-thin);
`

const Time = styled.time`
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-thin);
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	h1 {
		margin-top: 0.5rem;
	}
`

export const Title = ({
	title,
	subtitle,
	date,
}: {
	title?: string | null
	subtitle?: string | null
	date?: string | null
}) => {
	if (title === null) return null
	return (
		<Wrapper>
			{subtitle !== null && subtitle !== undefined && (
				<Subtitle>{subtitle}</Subtitle>
			)}
			<h1>{title}</h1>
			{date !== null && date !== undefined && (
				<Time dateTime={date}>{format(new Date(date), 'd. MMMM yyyy')}</Time>
			)}
		</Wrapper>
	)
}
