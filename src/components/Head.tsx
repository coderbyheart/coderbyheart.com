import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import { SiteMetaData } from '../site'
import { fonts } from '../design/settings'

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

const isSSR = typeof window === 'undefined'

export const Head = ({
	siteMetaData: {
		title: siteTitle,
		tagLine,
		description,
		twitter,
		defaultCard,
	},
	page,
	card,
}: {
	siteMetaData: Pick<
		SiteMetaData,
		'title' | 'description' | 'twitter' | 'defaultCard' | 'tagLine'
	>
	page: {
		title?: string | null
		description?: string | null
		lang?: string | null
	}
	card?: string
}) => {
	const version = isSSR
		? process.env.VERSION ?? Date.now()
		: document.head.querySelector<HTMLMetaElement>("meta[name='version']")
				?.content ?? Date.now()
	return (
		<>
			<Helmet>
				<title>
					{siteTitle} · {page.title ?? tagLine}
				</title>
				<meta name="description" content={page.description ?? description} />
				<html lang={page.lang ?? 'en'} />
				<link rel="icon" type="image/x-icon" href={withPrefix('favicon.ico')} />
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link rel="preconnect" href="https://cdn.jsdelivr.net"></link>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<script type="text/javascript">
					{loadAsync(
						`https://fonts.googleapis.com/css2?${googleFontsArgs}&display=swap`,
					)}
				</script>
				<link
					rel="stylesheet"
					href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
				/>
				<script async src={withPrefix(`main.js?v=${version}`)}></script>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content={twitter} />
				<meta name="twitter:title" content={page.title ?? siteTitle} />
				<meta
					name="twitter:description"
					content={page.description ?? description}
				/>
				<meta name="twitter:image" content={card ?? defaultCard} />
			</Helmet>
		</>
	)
}
