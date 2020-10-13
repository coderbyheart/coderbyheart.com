import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import { SiteMetaData } from '../templates/types'
import { fonts, breakpoints } from './settings'

const GlobalStyle = createGlobalStyle`
	:root {
		--text-font-family: ${fonts.text.name}, sans-serif;
		--text-font-weigth: ${fonts.text.weights.regular};
		--text-font-weigth-bold: ${fonts.text.weights.bold};
		--headline-font-family: ${fonts.headline.name}, sans-serif;
		--headline-font-weight: ${fonts.headline.weights.regular};
		--headline-font-weight-light: ${fonts.headline.weights.light};
		--headline-font-weight-thin: ${fonts.headline.weights.thin};
		--background-color: #ffffff;
		--background-color-dark: #191919;
		--highlight-color: #007da7;
		--highlight-color-on-dark: #00b4ef;
		--note-bg-color: #e7f9ff;
		--text-color: #3f3f3f;
		--text-color-light: #ffffffd9;
		--heart-color: #e00073;
		--heart-color-on-note: #d8006f;
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
			line-height: 115%;
		}
	}
	#___gatsby, #gatsby-focus-wrapper {
		height: 100%;
	}
	body {
		overflow-x: hidden;
	}
	img.lazyload:not([src]) {
		visibility: hidden;
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
	pageTitle: string
}) => (
	<>
		<Helmet>
			<title>
				{siteTitle} · {pageTitle}
			</title>
			<meta name="description" content={description} />
			<html lang="en" />
			<link rel="icon" type="image/x-icon" href={withPrefix('favicon.ico')} />
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
				src={withPrefix(`outline.js?v=${process.env.VERSION}`)}
				crossOrigin="anonymous"
			></script>
			<script
				async
				src={withPrefix(`scrolling.js?v=${process.env.VERSION}`)}
				crossOrigin="anonymous"
			></script>
			<script
				async
				src={withPrefix(`responsive-images.js?v=${process.env.VERSION}`)}
				crossOrigin="anonymous"
			></script>
			<script
				async
				src="https://platform.twitter.com/widgets.js"
				crossOrigin="anonymous"
			></script>
		</Helmet>
		<GlobalStyle />
	</>
)
