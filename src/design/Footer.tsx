import { withPrefix } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Page, SiteMetaData } from '../templates/types'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'
import { Content } from './Content'
import { breakpoints } from './settings'

import Heart from './heart.svg'

export const StyledFooter = styled.footer`
	background-color: var(--background-color-dark);
	color: var(--text-color-light);
	font-size: var(--small-font-size);
	a {
		color: var(--highlight-color-on-dark);
		text-decoration: none;
	}
	hr {
		border: 0;
		border-bottom: 1px solid var(--highlight-color-on-dark);
		opacity: 0.5;
		width: 5rem;
		margin: 0;
	}
	h1,
	h2 {
		position: relative;
		margin-bottom: 1.5rem;
		:after {
			content: ' ';
			width: 5rem;
			height: 1px;
			border-bottom: 1px solid var(--highlight-color-on-dark);
			opacity: 0.5;
			position: absolute;
			left: 0;
			bottom: -0.5rem;
		}
	}
	h1 {
		font-size: 42px;
		a {
			color: inherit;
			display: flex;
		}
		svg {
			width: calc(42px * 1.25);
			height: calc(42px * 1.25);
		}
	}
	h2 {
		margin-top: 3rem;
	}
`

const Wrapper = styled.div`
	max-width: var(--max-width);
	padding: 1rem 1rem;
	@media (min-width: ${breakpoints.content}) {
		padding: 4rem 0;
		margin: 0 auto;
	}
	p {
		max-width: calc(var(--max-width) / 2);
	}
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: row;
		li + li {
			:before {
				content: '·';
				padding: 0.5rem;
			}
		}
	}
	@media (min-width: ${breakpoints.content}) {
		ul {
			flex-direction: column;
			li + li {
				:before {
					content: '';
					padding: 0;
				}
			}
		}
	}
`

const Copyright = styled.p`
	margin-top: 2rem;
`

const Photo = styled.img`
	width: 33%;
	max-width: 150px;
	float: right;
	border-radius: 100%;
	border: 2px solid var(--heart-color);
	margin-left: 1rem;
`

export const Footer = ({
	siteMetaData: { title },
	content,
	className,
}: React.PropsWithChildren<{
	content: Page
	className?: string
	siteMetaData: Pick<SiteMetaData, 'title' | 'tagLine'>
}>) => (
	<StyledFooter className={className}>
		<Wrapper>
			<h1>
				<a href={withPrefix('/')}>
					coder.by(
					<Heart />)
				</a>
			</h1>
			<Photo
				className="lazyload"
				alt={title}
				data-src="https://images.contentful.com/bncv3c2gt878/6CWMgqeZdCmkk6KkIUksgQ/50922090bc6566c6624c12b82a4bf78c/36671282034_427eace68d_o.jpg?w=150"
			/>
			<Content>{renderHtmlAstToReact(content.remark.htmlAst)}</Content>
			<Copyright>
				© 2015-{new Date().getFullYear()}{' '}
				<a href="https://coderbyheart.com/">{title}</a>. All rights reserved.
			</Copyright>
		</Wrapper>
	</StyledFooter>
)
