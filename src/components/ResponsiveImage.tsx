import React from 'react'
import { useInView } from 'react-intersection-observer'
import classNames from 'classnames'
import styled from 'styled-components'
import { withPrefix } from 'gatsby'

const isSSR = typeof window === 'undefined'

const step = (n: number): number => Math.floor(n / 50) * 50

const Image = styled.img`
	background-color: #eee;
`

export const ResponsiveImage = ({
	src,
	alt,
	className,
}: {
	src: string
	alt: string
	className?: string
}) => {
	if (isSSR) return null
	const { ref, inView } = useInView({ triggerOnce: true })

	let aspectratio
	let width
	let height
	let largeSource

	const params = new URLSearchParams(src?.split('?')[1])
	const extraClasses = {} as Record<string, boolean>
	params.set('fm', 'webp')
	params.set('fit', 'thumb')
	const [w, h] = [params.get('w'), params.get('h')].map((s) =>
		parseInt(s ?? '0', 10),
	)
	if (w > 0 && h > 0) {
		const ratio = h / w
		aspectratio = ratio.toFixed(3)
		width = w.toString()
		height = h.toString()
		extraClasses.responsive = true
		const maxSize = Math.min(window.innerWidth, w) // Do not upscale images
		const imgWidth = Math.min(Math.max(maxSize, 1000), w)
		const imgHeight = imgWidth * ratio
		params.set('w', step(imgWidth).toFixed(0))
		params.set('h', step(imgHeight).toFixed(0))
		if (w > window.innerWidth) {
			largeSource = '1'
		}
		const notFullHeight = step(Math.min(window.innerHeight * 0.8, imgHeight))
		if (h > notFullHeight) {
			height = notFullHeight
			params.set('h', notFullHeight.toFixed())
		}
	}
	return (
		<Image
			src={
				inView
					? `${src
							.split('?')[0]
							.replace(/^\/\//, 'https://')}?${params.toString()}`
					: withPrefix('transparent.png')
			}
			ref={ref}
			alt={alt}
			width={width}
			height={height}
			data-aspectratio={aspectratio}
			data-large-source={largeSource}
			className={classNames(className, extraClasses)}
			style={{ height: `${height}px` }}
		/>
	)
}
