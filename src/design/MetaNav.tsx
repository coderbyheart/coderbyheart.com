import { withPrefix } from 'gatsby'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { SiteMetaData } from '../templates/types'
import { breakpoints } from './settings'

const StyledNav = styled.nav`
	background-color: var(--background-color-dark);
	color: var(--text-color-light);
	font-size: var(--small-font-size);
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-light);
	strong {
		font-weight: var(--headline-font-weight);
	}
	a {
		color: var(--text-color-light);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99999;
`

const Shrink = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex-shrink: 1;
	strong {
		text-transform: uppercase;
	}
`

const ContentNav = styled.div`
	display: none;
`

const Wrapper = styled.div`
	padding: 0 1rem;
	@media (min-width: ${breakpoints.content}) {
		padding: 0;
	}
	margin: 0 auto;
	max-width: var(--max-width);
	display: flex;
	justify-content: space-between;
	align-items: center;
	span + span {
		:before {
			content: '·';
			padding: 0.25rem;
		}
	}
	height: 40px;
`

const GlobalStyle = createGlobalStyle`
#___gatsby {
	padding-top: 40px;
}
body.scrolling {
	${ContentNav} {
		display: block;
	}
	${Shrink} {
		span {
			display: none;
		}
	}
	${Wrapper} {
		svg {
			display: none;
		}
	}
}
`

export const MetaNav = ({
	siteMetaData: { title, tagLine },
	className,
}: React.PropsWithChildren<{
	siteMetaData: Pick<SiteMetaData, 'title' | 'tagLine'>
	className?: string
}>) => (
	<>
		<StyledNav className={className}>
			<Wrapper>
				<Shrink>
					<a href={withPrefix('/')}>
						<strong>{title}</strong>
						<span> &middot; {tagLine}</span>
					</a>
				</Shrink>
				<ContentNav>
					<span>
						<a href={withPrefix('/archive/')}>Blog</a>
					</span>
					<span>
						<a href={withPrefix('/talks/')}>Talks</a>
					</span>
					<span>
						<a href={withPrefix('/communities/')}>Communities</a>
					</span>
				</ContentNav>
			</Wrapper>
		</StyledNav>
		<GlobalStyle />
	</>
)
