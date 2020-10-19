import React from 'react'
import { EmbedTweet } from '../components/EmbedTweet'
import * as hastToHyperscript from 'hast-to-hyperscript'

const responsiveImage = (attrs: Record<string, string | null>) => {
	const params = new URLSearchParams(attrs.src?.split('?')[1])
	attrs['data-src'] = attrs.src
	attrs.src = ''
	attrs.className = 'lazyload'
	const [w, h] = [params.get('w'), params.get('h')].map((s) =>
		parseInt(s ?? '0', 10),
	)
	if (w > 0 && h > 0) {
		attrs['data-aspectratio'] = (h / w).toFixed(3)
		attrs.width = w.toString()
		attrs.height = h.toString()
		attrs.className = `${attrs.className} responsive`
	}
}

export const renderHtmlAstToReact = (tree: unknown): any =>
	hastToHyperscript(
		(name: string, attrs: Record<string, string | null>, children: any) => {
			if (name === 'img' && attrs.src !== null) {
				responsiveImage(attrs)
			}
			if (name === 'a') {
				const twitterStatusMatch = attrs.href?.match(
					/^https:\/\/twitter\.com\/[^/]+\/status\/([0-9]+)\?embed/,
				)
				const status = twitterStatusMatch?.[1]
				if (status !== undefined) {
					return React.createElement(
						EmbedTweet,
						{
							status,
							params: new URLSearchParams(attrs.href?.split('?')[1]),
							...attrs,
						},
						children,
					)
				}
			}
			return React.createElement(name, attrs, children)
		},
		tree,
	).props.children
