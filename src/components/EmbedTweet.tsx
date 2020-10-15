import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const isSSR = typeof window === 'undefined'

const loadScriptAsync = async (uri: string) =>
	new Promise((resolve) => {
		const tag = document.createElement('script')
		tag.src = uri
		tag.async = true
		tag.onload = () => {
			resolve()
		}
		const firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
	})

export const EmbedTweet = ({ status }: { status: string }) => {
	if (isSSR) return null
	const { ref, inView, entry } = useInView({ triggerOnce: true })
	useEffect(() => {
		let isMounted = true
		if (isSSR) return
		if (!inView) return
		void loadScriptAsync('https://platform.twitter.com/widgets.js').then(() => {
			if (!isMounted) return
			twttr.widgets.createTweet(status, entry?.target, {})
		})
		return () => {
			isMounted = false
		}
	}, [isSSR, inView])
	return <span ref={ref} />
}
