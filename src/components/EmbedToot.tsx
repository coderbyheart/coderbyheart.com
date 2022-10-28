import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const isSSR = typeof window === 'undefined'

const IFrame = styled.iframe`
	width: 100%;
	border: 0;
	height: 400px;
`

const loadScriptAsync = async (uri: string) =>
	new Promise<void>((resolve) => {
		const tag = document.createElement('script')
		tag.src = uri
		tag.async = true
		tag.onload = () => {
			resolve()
		}
		const firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
	})

export const EmbedToot = ({ url }: { url: string }) => {
	if (isSSR) return null
	const { ref, inView } = useInView({ triggerOnce: true })
	useEffect(() => {
		let isMounted = true
		if (isSSR) return
		if (!inView) return
		void loadScriptAsync('https://chaos.social/embed.js')
		return () => {
			isMounted = false
		}
	}, [isSSR, inView])
	return (
		<IFrame
			src={url}
			className="mastodon-embed"
			width="400"
			allowFullScreen
		></IFrame>
	)
}
