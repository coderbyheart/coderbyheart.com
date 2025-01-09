import { createSignal } from 'solid-js'

import styles from './Hero.module.css'

const responsive = (url: URL, width: number): string => {
	if (url.hostname.includes('images.ctfassets.net')) {
		const responsiveURL = new URL(url.toString())
		responsiveURL.searchParams.set('w', width.toString())
		responsiveURL.searchParams.set('fm', 'webp')
		responsiveURL.searchParams.set('q', '90')
		return responsiveURL.toString()
	}
	return url.toString()
}

export const Hero = (props: { alt: string; src: URL }) => {
	let el: HTMLImageElement | undefined
	const [width] = createSignal<number>(1024)

	const url = () => responsive(props.src, width())

	return (
		<aside class={styles.hero}>
			<img
				src={url()}
				alt={props.alt}
				style={{
					'aspect-ratio': '2048/1152',
				}}
				ref={el}
			/>
		</aside>
	)
}
