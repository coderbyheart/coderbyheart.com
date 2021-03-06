import React from 'react'
import { useInView } from 'react-intersection-observer'
import classNames from 'classnames'
import styled from 'styled-components'
import { withPrefix } from 'gatsby'
import { breakpoints } from '../design/settings'

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
	const { ref, inView, entry } = useInView({ triggerOnce: true })

	let aspectratio
	let width
	let height
	let largeSource = false
	let imgWidth
	let imgHeight

	const params = new URLSearchParams(src?.split('?')[1])
	const extraClasses = {} as Record<string, boolean>
	params.set('fm', 'webp')
	params.set('q', '90')
	params.set('fit', 'thumb')
	const [w, h] = [params.get('w'), params.get('h')].map((s) =>
		parseInt(s ?? '0', 10),
	)
	if (w > 0 && h > 0) {
		const ratio = h / w
		aspectratio = ratio.toFixed(3)
		width = w.toString()
		height = h.toString()
		if (w < window.innerWidth || className?.includes('notresponsive')) {
			const parentSize =
				entry?.target?.parentElement?.parentElement?.clientWidth ??
				breakpoints.contentNumeric
			const maxSize = Math.min(parentSize, w) // Do not upscale images
			imgWidth = Math.min(Math.min(maxSize, 2000), w)
			params.set('w', imgWidth.toFixed(0))
			params.set('h', (imgWidth * ratio).toFixed(0))
			// Image will be scale up to 100% width
			imgHeight = parentSize * ratio
		} else {
			extraClasses.responsive = true
			const maxSize = Math.min(window.innerWidth, w) // Do not upscale images
			largeSource = true
			imgWidth = Math.min(Math.min(maxSize, 2000), w)
			imgHeight = imgWidth * ratio
			params.set('w', step(imgWidth).toFixed(0))
			params.set('h', step(imgHeight).toFixed(0))
			const notFullHeight = Math.min(
				window.innerHeight * 0.8,
				Math.min(window.innerWidth * ratio, h),
			)
			if (h > notFullHeight) {
				height = notFullHeight
				params.set(
					'h',
					step((notFullHeight / window.innerWidth) * imgWidth).toFixed(0),
				)
			}
		}
	}

	const base = src.split('?')[0]

	const fallbackParams = new URLSearchParams(params.toString())
	if (/\.jpe?g$/i.test(base)) {
		fallbackParams.set('fm', 'jpg')
	} else if (/\.png$/i.test(base)) {
		fallbackParams.set('fm', 'png')
	}

	return (
		<picture>
			<source
				srcSet={
					inView
						? `${base.replace(/^\/\//, 'https://')}?${params.toString()}`
						: withPrefix('transparent.png')
				}
				type="image/webp"
			></source>
			<Image
				src={
					inView
						? `${base.replace(
								/^\/\//,
								'https://',
						  )}?${fallbackParams.toString()}`
						: withPrefix('transparent.png')
				}
				ref={ref}
				alt={alt}
				width={width}
				height={height}
				data-aspectratio={aspectratio}
				data-large-source={largeSource ? '1' : '0'}
				className={classNames(className, extraClasses)}
				style={{
					height: largeSource ? `${height}px` : `${imgHeight}px`,
				}}
			/>
		</picture>
	)
}
