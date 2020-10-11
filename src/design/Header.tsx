import { withPrefix } from 'gatsby'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { SiteMetaData } from '../templates/types'

const MetaNav = styled.nav`
	background-color: var(--background-color-dark);
	color: var(--text-color-light);
	font-size: var(--small-font-size);
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-regular);
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
	margin: 0 auto;
	max-width: var(--max-width);
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	span + span {
		:before {
			content: '·';
			padding: 0.25rem;
		}
	}
`

const GlobalStyle = createGlobalStyle`
body.scrolling {
	margin-top: 45px;
	${MetaNav} {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	${ContentNav} {
		display: block;
	}
	${Shrink} {
		span {
			display: none;
		}
	}
}
`

export const Header = ({
	siteMetaData: { title, subTitle },
	className,
}: React.PropsWithChildren<{
	siteMetaData: Pick<SiteMetaData, 'title' | 'subTitle'>
	className?: string
}>) => (
	<>
		<MetaNav className={className}>
			<Wrapper>
				<Shrink>
					<a href={withPrefix('/')}>
						<strong>{title}</strong>
						<span> &middot; {subTitle}</span>
					</a>
				</Shrink>
				<ContentNav>
					<span>
						<a href={withPrefix('/archive/')}>Archive</a>
					</span>
					<span>
						<a href={withPrefix('/about/')}>About</a>
					</span>
					<span>
						<a href={withPrefix('/talks/')}>Talks</a>
					</span>
					<span>
						<a href={withPrefix('/communitities/')}>Communities</a>
					</span>
				</ContentNav>
			</Wrapper>
		</MetaNav>
		<GlobalStyle />
	</>
)
