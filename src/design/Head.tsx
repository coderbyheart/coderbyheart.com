import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import { SiteMetaData } from '../templates/types'
import { fonts, colors, breakpoints } from './settings'

const GlobalStyle = createGlobalStyle`
	:root {
		--text-font-family: ${fonts.text.name}, sans-serif;
		--text-font-weigth: ${fonts.text.weights.regular};
		--headline-font-family: ${fonts.headline.name}, sans-serif;
		--headline-font-weight: ${fonts.headline.weights.regular};
		--headline-font-weight-light: ${fonts.headline.weights.light};
		--background-color: ${colors.background};
		--background-color-dark: ${colors.darkBackground};
		--highlight-color: ${colors.highlight};
		--text-color: ${colors.text};
		--text-color-light: ${colors.textLight};
		--heart-color: ${colors.heart};
		--small-font-size: 12px;
		--max-width: ${breakpoints.content};
	}
	html,
	body {
		font-family: var(--text-font-family);
		font-weight: var(--text-font-weigth);
		height: 100%;
		background-color: var(--background-color);
		color: var(--text-color);
		h1, h2, h3, h4, h5, h6 {
			font-family: var(--headline-font-family);
			font-weight: var(--headline-font-weight);
			line-height: 100%;
		}
	}
	#___gatsby, #gatsby-focus-wrapper {
		height: 100%;
	}
`

const loadAsync = (src: string): string => `(function(d){
	var x = d.createElement("link");
	var y = d.getElementsByTagName("script")[0];
	x.rel = "stylesheet";
	x.href = "${src}";
	y.parentNode.insertBefore(x, y);
})(document);`

const googleFontsArgs = Object.values(fonts)
	.map(
		({ name, weights }) =>
			`family=${encodeURIComponent(name)}:wght@${Object.values(weights).join(
				';',
			)}`,
	)
	.join('&')

export const Head = ({
	siteMetaData: { title: siteTitle, description },
	pageTitle,
}: {
	siteMetaData: Pick<SiteMetaData, 'title' | 'description'>
	pageTitle?: string
}) => (
	<>
		<Helmet>
			<title>
				{siteTitle}
				{pageTitle !== undefined ? ` · ${pageTitle}` : ''}
			</title>
			<meta name="description" content={description} />
			<html lang="en" />
			<link rel="icon" type="image/x-icon" href={withPrefix('favicon.ico')} />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<script type="text/javascript">
				{loadAsync(
					`https://fonts.googleapis.com/css2?${googleFontsArgs}&display=swap`,
				)}
			</script>
			<link
				rel="stylesheet"
				href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
			/>
			<script
				async
				src="https://afarkas.github.io/lazysizes/lazysizes.min.js"
				crossOrigin="anonymous"
			></script>
			<script
				async
				src="https://afarkas.github.io/lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js"
				crossOrigin="anonymous"
			></script>
			<script
				async
				src={withPrefix('outline.js')}
				crossOrigin="anonymous"
			></script>
			<script
				async
				src={withPrefix('scrolling.js')}
				crossOrigin="anonymous"
			></script>
		</Helmet>
		<GlobalStyle />
	</>
)
