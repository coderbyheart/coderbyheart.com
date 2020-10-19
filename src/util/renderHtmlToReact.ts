import React from 'react'
import { EmbedTweet } from '../components/EmbedTweet'
import { ResponsiveImage } from '../components/ResponsiveImage'
import * as hastToHyperscript from 'hast-to-hyperscript'

export const renderHtmlAstToReact = (tree: unknown): any =>
	hastToHyperscript(
		(name: string, attrs: Record<string, string | null>, children: any) => {
			if (name === 'img' && attrs.src !== null) {
				return React.createElement(ResponsiveImage, attrs, children)
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
