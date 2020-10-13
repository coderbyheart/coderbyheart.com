import styled from 'styled-components'
import { breakpoints } from './settings'

export const Content = styled.div`
	img {
		width: 100%;
	}
	line-height: 150%;
	a {
		color: var(--highlight-color);
	}
	h1,
	h2 {
		position: relative;
		margin-top: 4rem;
		margin-bottom: 1.5rem;
		:after {
			content: ' ';
			width: 5rem;
			height: 1px;
			border-bottom: 1px solid var(--highlight-color);
			opacity: 0.5;
			position: absolute;
			left: 0;
			bottom: -0.5rem;
		}
		small {
			font-weight: var(--headline-font-weight-thin);
			font-size: 50%;
			text-transform: uppercase;
		}
	}
	strong {
		font-weight: var(--text-font-weigth-bold);
	}
	blockquote {
		border: 1px solid var(--heart-color);
		border-radius: 5px;
		padding: 0 1rem;
		margin: 0;
		background-color: var(--note-bg-color);
		a {
			color: var(--heart-color-on-note);
		}
	}
	div.twitter-tweet-rendered {
		margin: 2rem auto !important;
	}
	img[data-large-source='1'] {
		width: 100vw;
		height: auto;
		margin-left: -1rem;
		margin-right: -1rem;
		@media (min-width: ${breakpoints.content}) {
			margin-top: 4rem;
			margin-bottom: 4rem;
			margin-left: calc((100vw - ${breakpoints.content}) / 2 * -1);
			margin-right: calc((100vw - ${breakpoints.content}) / 2 * -1);
		}
	}
`
