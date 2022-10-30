import React from 'react'
import styled from 'styled-components'
import { Head } from '../components/Head'
import { Content } from '../design/Content'
import { avatarUrl, Footer } from '../design/Footer'
import { Header } from '../design/Header'
import { breakpoints } from '../design/settings'
import { GlobalStyle } from '../design/style'
import { Wrapper } from '../design/Title'
import { Page, SiteMetaData } from '../site'

const Main = styled.main`
	padding: 1rem;
	margin-bottom: 4rem;
	@media (min-width: ${breakpoints.content}) {
		padding: 0;
		margin: 4rem auto;
	}
	max-width: var(--max-width);
	&.home ${Content} {
		:before {
			display: inline-block;
			content: '';
			background-image: url('${avatarUrl()}');
			background-size: cover;
			width: 150px;
			height: 150px;
			border-radius: 100%;
			border: 2px solid var(--heart-color);
			margin-top: 3rem;
			margin-bottom: 2rem;
			margin-left: calc((100vw / 2) - (154px / 2) - 1rem);
			box-shadow: 0px 0px 15px 3px #00000057;
			@media (min-width: ${breakpoints.content}) {
				margin-top: 0;
				margin-left: calc(${breakpoints.content} / 2 - 154px / 2);
			}
		}
	}
	&.twitter-status article ${Wrapper} h1 {
		margin-top: 0.5rem;
	}
`

const PageTemplate = ({
	siteMetadata,
	children,
	description,
	title,
	lang,
	card,
	mainClass,
	Footer: FooterContent,
}: React.PropsWithChildren<{
	siteMetadata: SiteMetaData
	Footer: Page
	description?: string | null
	title?: string | null
	lang?: string | null
	card?: string | null
	mainClass?: string
}>) => (
	<>
		<Head
			siteMetaData={siteMetadata}
			page={{
				description,
				title,
				lang,
			}}
			card={card}
		/>
		<GlobalStyle />
		<Header siteMetaData={siteMetadata} />
		<Main className={mainClass}>
			<Content>{children}</Content>
		</Main>
		<Footer siteMetaData={siteMetadata} content={FooterContent} />
	</>
)

export default PageTemplate
