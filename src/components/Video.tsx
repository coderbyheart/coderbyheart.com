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

	const ar = aspectRatio ?? 1.5

	const [width, setWidth] = useState<number>(250)
	const [height, setHeight] = useState<number>(width * ar)

	useLayoutEffect(() => {
		console.log(videoRef.current?.clientWidth)
		setWidth(videoRef.current?.clientWidth ?? 250)
		setHeight((videoRef.current?.clientWidth ?? width) / ar)
	}, [videoRef])

	return (
		<StyledVideo
			autoPlay
			loop
			width={width}
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
