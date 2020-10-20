import React from 'react'
import { useInView } from 'react-intersection-observer'

const isSSR = typeof window === 'undefined'

export const EmbedYouTube = ({ id }: { id: string }) => {
	if (isSSR)
		return (
			<a href={`https://www.youtube.com/watch?v=${id}`}>Watch on YouTube</a>
		)
	const { ref, inView, entry } = useInView({ triggerOnce: true })

	if (inView)
		return (
			<iframe
				title={'Watch on YouTube'}
				ref={ref}
				width={entry?.target.parentElement?.clientWidth}
				height={Math.floor(entry?.target.parentElement?.clientWidth / 1.75)}
				src={`https://www.youtube-nocookie.com/embed/${id}`}
				frameBorder={0}
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		)
	return <span ref={ref} />
}
