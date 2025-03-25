import type { Photo, PhotoOnCDN } from '#util/loadMarkdownContent.ts'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { createEffect, createSignal, Show } from 'solid-js'

const hiRes = (size: number): number =>
	Math.floor(size * (window.devicePixelRatio ?? 1))

const roundTo50 = (size: number): number => Math.floor(size / 50) * 50

export const thumb = (size: number, url: URL): string =>
	`${url.toString()}?f=thumb&w=${hiRes(size)}&q=8`

export const sized = (
	{ width, height }: { width: number; height: number },
	url: URL,
) =>
	`${url.toString()}?f=scaled&w=${roundTo50(hiRes(width))}&h=${roundTo50(hiRes(height))}&q=9`

export const Hero = (props: { hero: Photo }) => (
	<aside class={'hero'}>
		<Show
			when={props.hero.cdn !== undefined}
			fallback={<SimpleImage hero={props.hero} />}
		>
			<ResponsiveImage photo={props.hero as PhotoOnCDN} />
		</Show>
	</aside>
)

const SimpleImage = (props: { hero: Photo }) => (
	<img src={props.hero.src} alt={props.hero.alt} />
)

const ResponsiveImage = (props: { photo: PhotoOnCDN }) => {
	const { cdn } = props.photo
	let el: HTMLImageElement | undefined
	const [resizedURL, setResizedURL] = createSignal<URL>()

	const inView = createVisibilityObserver({ threshold: 0.01 })(() => el)

	createEffect(() => {
		if (inView() && resizedURL() === undefined) {
			const width = el?.getBoundingClientRect().width ?? -1
			console.debug('[ResponsiveImage]', 'Width:', width)
			if (width > 0) {
				const resizedUrl = new URL(
					sized(
						{
							width,
							height: Math.floor(width * (cdn.dim.height / cdn.dim.width)),
						},
						new URL(cdn.url),
					),
				)
				console.debug(
					'[ResponsiveImage]',
					'Resized URL:',
					resizedUrl.toString(),
				)
				const start = Date.now()
				fetch(resizedUrl.toString(), {
					mode: 'no-cors',
				})
					.then(() => {
						setResizedURL(resizedUrl)
						console.debug(
							'[ResponsiveImage]',
							'fetched in',
							Date.now() - start,
							'ms',
						)
					})
					.catch((err) =>
						console.error(
							'[ResponsiveImage]',
							'Error fetching',
							resizedUrl.toString(),
							err,
						),
					)
			}
		}
	})

	return (
		<picture
			style={{
				'aspect-ratio': `${cdn.dim.width} / ${cdn.dim.height}`,
			}}
		>
			<Show when={resizedURL() !== undefined}>
				<source srcset={resizedURL()!.toString()} />
			</Show>
			<img
				src={cdn.preview}
				alt={props.photo.alt}
				width={cdn.dim.width}
				height={cdn.dim.height}
				ref={el}
			/>
		</picture>
	)
}
