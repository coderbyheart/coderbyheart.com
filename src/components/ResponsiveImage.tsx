import classNames from 'classnames'
import { withPrefix } from 'gatsby'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { breakpoints } from '../design/settings'

const isSSR = typeof window === 'undefined'

const hiRes = (size: number): number =>
	Math.floor(size * (window.devicePixelRatio ?? 1))

const step = (n: number): number => Math.floor(n / 50) * 50

const Image = styled.img`
	background-color: #eee;
`

const SVGImage = styled.img`
	max-width: 250px;
	margin: 2rem;
`

const SVGWrapper = styled.div`
	display: flex;
	justify-content: center;
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

	const base = src.split('?')[0]
	const isSVG = base.endsWith('.svg') ?? false

	if (isSVG)
		return (
			<SVGWrapper>
				<SVGImage src={base} />
			</SVGWrapper>
		)

	const params = new URLSearchParams(src?.split('?')[1])
	const extraClasses = {} as Record<string, boolean>
	const notResponsive =
		entry?.target?.parentElement?.parentElement?.parentElement?.className.includes(
			'notresponsive',
		)
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
		if (w < window.innerWidth || notResponsive) {
			const parentSize =
				entry?.target?.parentElement?.parentElement?.clientWidth ??
				breakpoints.contentNumeric
			const maxSize = Math.min(parentSize, w) // Do not upscale images
			imgWidth = Math.min(Math.min(maxSize, 2000), w)
			params.set('w', hiRes(imgWidth).toFixed(0))
			params.set('h', hiRes(imgWidth * ratio).toFixed(0))
			// Image will be scale up to 100% width
			imgHeight = parentSize * ratio
		} else {
			extraClasses.responsive = true
			const maxSize = Math.min(window.innerWidth, w) // Do not upscale images
			largeSource = true
			imgWidth = Math.min(Math.min(maxSize, 2000), w)
			imgHeight = imgWidth * ratio
			params.set('w', hiRes(step(imgWidth)).toFixed(0))
			params.set('h', hiRes(step(imgHeight)).toFixed(0))
			const notFullHeight = Math.min(
				window.innerHeight * 0.8,
				Math.min(window.innerWidth * ratio, h),
			)
			if (h > notFullHeight) {
				height = notFullHeight
				params.set(
					'h',
					hiRes(step((notFullHeight / window.innerWidth) * imgWidth)).toFixed(
						0,
					),
				)
			}
		}
	}

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
