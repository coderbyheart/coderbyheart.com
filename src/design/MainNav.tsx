import { withPrefix } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { breakpoints } from './settings'

import Heart from './heart.svg'
import { GatsbyLocation } from '../templates/types'

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
	location,
}: React.PropsWithChildren<{
	className?: string
	location: GatsbyLocation
}>) => (
	<StyledNav className={className}>
		<Wrapper>
			<Logo href={withPrefix('/')}>
				coder.by(
				<Heart />)
			</Logo>
			<ContentNav>
				<a
					href={withPrefix('/')}
					className={location.pathname === '/' ? 'active' : ''}
				>
					Home
				</a>
				<a
					href={withPrefix('/archive/')}
					className={location.pathname.startsWith('/archive') ? 'active' : ''}
				>
					Blog
				</a>
				<a
					href={withPrefix('/talks/')}
					className={location.pathname.startsWith('/talks') ? 'active' : ''}
				>
					Talks
				</a>
				<a
					href={withPrefix('/communities/')}
					className={
						location.pathname.startsWith('/communities') ? 'active' : ''
					}
				>
					Communities
				</a>
			</ContentNav>
		</Wrapper>
	</StyledNav>
)
