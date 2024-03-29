import { Link } from 'gatsby'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Page, SiteMetaData } from '../site'
import { renderHtmlAstToReact } from '../util/renderHtmlToReact'
import { Content } from './Content'
import { breakpoints } from './settings'

import Heart from './heart.svg'

export const StyledFooter = styled.footer`
	min-height: 100%;
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
			padding-top: 0;
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
	height: auto;
	float: right;
	border-radius: 100%;
	border: 2px solid var(--heart-color);
	margin-left: 1rem;
`

export const avatarUrl = (width = 300) =>
	`//images.ctfassets.net/bncv3c2gt878/18M7LZPr4Dah1nSJagy6bk/09d2f6f4f373d983d0214ecd896bd89f/Me_2022-08?w=${width}&fm=webp`

export const Footer = ({
	siteMetaData: { title },
	content,
	className,
}: React.PropsWithChildren<{
	content: Page
	className?: string
	siteMetaData: Pick<SiteMetaData, 'title'>
}>) => {
	const { ref, inView } = useInView({ triggerOnce: true })
	return (
		<StyledFooter className={className} ref={ref}>
			<Wrapper>
				<h1>
					<Link to={'/'}>
						coder.by(
						<Heart />)
					</Link>
				</h1>
				{inView && (
					<Photo alt={title} src={avatarUrl()} width="150" height="150" />
				)}
				<Content>{renderHtmlAstToReact(content.remark.htmlAst)}</Content>
				<Copyright>
					© 2015-{new Date().getFullYear()}{' '}
					<a href="https://coderbyheart.com/">{title}</a>. All rights reserved.
				</Copyright>
			</Wrapper>
		</StyledFooter>
	)
}
