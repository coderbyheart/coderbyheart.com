import { toH } from 'hast-to-hyperscript'
import React from 'react'
import { EmbedToot } from '../components/EmbedToot'
import { EmbedTweet } from '../components/EmbedTweet'
import { EmbedYouTube } from '../components/EmbedYouTube'
import { ResponsiveImage } from '../components/ResponsiveImage'

export const renderHtmlAstToReact = (tree: unknown): any =>
	toH((name: string, attrs: Record<string, string | null>, children: any) => {
		if (name === 'img' && attrs.src !== null) {
			return React.createElement(ResponsiveImage, attrs, children)
		}
		if (name === 'a') {
			// Embed tweets
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
			// Embed YouTube videos
			const youTubeEmbedMatch = attrs.href?.match(
				/^https:\/\/www\.youtube\.com\/embed\/([^/]+)/,
			)
			const youTubeId = youTubeEmbedMatch?.[1]
			if (youTubeId !== undefined)
				return React.createElement(
					EmbedYouTube,
					{ id: youTubeId, ...attrs },
					children,
				)
			// Embed Toots
			const tootMatch = attrs.href?.match(
				/^https:\/\/[^/]+\/@[^/]+\/([0-9]+)\/embed$/,
			)
			const tootlURL = tootMatch?.[0]
			if (tootlURL !== undefined) {
				return React.createElement(EmbedToot, { url: tootlURL }, children)
			}
		}
		return React.createElement(name, attrs, children)
	}, tree).props.children
