import styled from 'styled-components'
import { breakpoints } from './settings'

export const Content = styled.div`
	padding: 1rem;
	@media (min-width: ${breakpoints.content}) {
		padding: 0;
	}
	margin: 0 auto;
	max-width: var(--max-width);
	img {
		width: 100%;
	}
	line-height: 150%;
`
