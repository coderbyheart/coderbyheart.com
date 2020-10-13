import { withPrefix, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from './settings'

import Heart from './heart.svg'

const StyledNav = styled.nav`
	font-family: var(--headline-font-family);
	font-weight: var(--headline-font-weight-light);
	strong {
		font-weight: var(--headline-font-weight);
	}
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	padding: 1rem 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const Logo = styled.a`
	font-size: 25px;
	font-weight: var(--headline-font-weight);
	color: inherit;
	display: flex;
	svg {
		width: calc(25px * 1.25);
		height: calc(25px * 1.25);
	}
`

const ContentNav = styled.div`
	text-transform: uppercase;
	a {
		color: var(--text-color);
		&.active,
		&:hover {
			color: var(--highlight-color);
			text-decoration: none;
		}
	}
	a + a {
		margin-left: 1rem;
	}
	margin-top: 1rem;
	@media (min-width: ${breakpoints.content}) {
		margin-top: 0;
	}
`

const Wrapper = styled.div`
	padding: 0 1rem;
	max-width: var(--max-width);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	@media (min-width: ${breakpoints.content}) {
		padding: 0;
		margin: 0 auto;
		flex-direction: row;
	}
`

export const MainNav = ({
	className,
}: React.PropsWithChildren<{
	className?: string
}>) => (
	<StyledNav className={className}>
		<Wrapper>
			<Logo href={withPrefix('/')}>
				coder.by(
				<Heart />)
			</Logo>
			<ContentNav>
				<Link to={'/'} activeClassName="active">
					Home
				</Link>
				<Link to={'/archive'} activeClassName="active">
					Blog
				</Link>
				<Link to={'/talks'} activeClassName="active">
					Talks
				</Link>
				<Link to={'/communities'} activeClassName="active">
					Communities
				</Link>
			</ContentNav>
		</Wrapper>
	</StyledNav>
)
