import React from 'react'
import { SiteMetaData } from '../site'
import { graphql } from 'gatsby'
import { Head } from '../components/Head'
import { avatarUrl } from '../design/Footer'
import styled from 'styled-components'

import Heart from '../design/heart.svg'
import { GlobalStyle } from '../design/style'

export const query = graphql`
	query SocialPageQuery {
		site {
			siteMetadata {
				title
				tagLine
				description
				gitHubUrl
				twitter
				defaultCard
				siteUrl
			}
		}
	}
`

const Main = styled.main`
	background-color: var(--background-color-dark);
	color: var(--text-color-light);
	height: 100%;
	display: flex;
	align-items: center;
	font-size: calc(var(--small-font-size) * 4.5);
	p {
		margin: 0;
		line-height: 150%;
		font-family: var(--headline-font-family);
		font-weight: var(--headline-font-weight-light);
	}
	h1 {
		font-size: 150px;
		color: inherit;
		display: flex;
		position: relative;
		svg {
			width: calc(150px * 1.25);
			height: calc(150px * 1.25);
		}
		margin-top: 0;
		margin-bottom: 1rem;
	}
	section:first-child {
		padding-left: 6rem;
		padding-right: 1rem;
	}
	section:last-child {
		padding-right: 6rem;
	}
`

const Photo = styled.img`
	width: 450px;
	height: auto;
	float: right;
	border-radius: 100%;
	border: 5px solid var(--heart-color);
	margin-left: 1rem;
`

const Link = styled.p`
	font-size: 175%;
	a {
		text-decoration: none;
		color: var(--text-color-light);
		font-weight: var(--headline-font-weight);
	}
	padding-top: 2rem;
`

const SocialPage = ({
	data: {
		site: { siteMetadata },
	},
}: {
	data: {
		site: {
			siteMetadata: SiteMetaData
		}
	}
}) => (
	<>
		<Head siteMetaData={siteMetadata} page={{ title: 'Social Card Default' }} />
		<GlobalStyle />
		<Main>
			<section>
				<h1>
					coder.by(
					<Heart />)
				</h1>
				{siteMetadata.description.split('​').map((s, i) => (
					<p key={i}>{s}</p>
				))}
				<Link>
					<a href={siteMetadata.siteUrl}>
						{siteMetadata.siteUrl
							.replace(/^https?:\/\//, '')
							.replace(/\/$/, '')}
					</a>
				</Link>
			</section>
			<section>
				<Photo alt={siteMetadata.title} src={avatarUrl(1024)} />
			</section>
		</Main>
	</>
)

export default SocialPage
