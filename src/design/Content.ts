import styled from 'styled-components'
import { breakpoints } from './settings'

export const Content = styled.div`
	img {
		width: 100%;
		height: auto;
	}
	line-height: 150%;
	a {
		color: var(--highlight-color);
	}
	h1,
	h2 {
		position: relative;
		:first-child {
			margin-top: 0;
		}
		@media (min-width: ${breakpoints.content}) {
			margin-top: 4rem;
		}
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
	img:not([src]) {
		visibility: hidden;
	}
	img[data-large-source='1'] {
		width: 100vw;
		margin-left: -1rem;
		margin-right: -1rem;
		@media (min-width: ${breakpoints.content}) {
			margin-top: 4rem;
			margin-bottom: 4rem;
			margin-left: calc((100vw - ${breakpoints.content}) / 2 * -1);
			margin-right: calc((100vw - ${breakpoints.content}) / 2 * -1);
		}
	}
	// Bigger tap targets on mobile
	li + li {
		padding-top: 1rem;
	}
	@media (min-width: ${breakpoints.content}) {
		li + li {
			padding-top: 0;
		}
	}

	pre[class*='language-'] > code {
		border-color: var(--highlight-color);
		background-image: none;
	}
	pre[class*='language-'] {
		:before,
		:after {
			box-shadow: none;
		}
		.token {
			&.constant {
				color: var(--highlight-color);
			}
			&.keyword {
				color: var(--highlight-color);
			}
			&.boolean {
				color: inherit;
			}
			&.function {
				color: var(--color-syntax-ChelseaGem);
			}
			&.number {
				color: inherit;
			}
			&.operator {
				color: inherit;
			}
			&.punctuation {
				color: var(--color-syntax-Emperor);
			}
			&.parameter {
				color: inherit;
			}
			&.regex {
				color: inherit;
			}
			&.string {
				color: var(--color-syntax-JapaneseLaurel);
			}
			&.class-name {
				color: inherit;
			}
			&.comment {
				color: var(--color-syntax-DoveGray);
			}
			&.template-string {
				color: inherit;
			}
			&.inserted {
				color: var(--color-syntax-JapaneseLaurel);
			}
		}
	}
`
