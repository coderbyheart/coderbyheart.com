import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const StyledVideo = styled.video`
	width: 100%;
	margin-top: 2rem;
`

const isSSR = typeof window === 'undefined'

export const Video = ({
	src,
	aspectRatio,
}: {
	src: string
	aspectRatio?: number
}) => {
	if (isSSR) return null
	const videoRef = useRef<HTMLVideoElement>(null)

	const defaultWidth = 250
	const ar = aspectRatio ?? 1.5

	const [height, setHeight] = useState<number>(defaultWidth * ar)

	useLayoutEffect(() => {
		setHeight((videoRef.current?.clientWidth ?? defaultWidth) / ar)
	}, [videoRef])

	return (
		<StyledVideo
			controls
			width="250"
			height={height}
			style={{
				aspectRatio: `${ar} / 1`,
				height: `${height}px`,
			}}
			ref={videoRef}
		>
			<source src={src} type="video/mp4" />
			Download the
			<a href={src}>MP4</a>
			video.
		</StyledVideo>
	)
}
