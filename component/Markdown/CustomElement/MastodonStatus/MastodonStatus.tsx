import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { memoize } from 'lodash-es'
import { createEffect, createSignal, Show } from 'solid-js'

const loadScriptAsync = memoize(
	async (uri: string) =>
		new Promise<void>((resolve) => {
			const tag = document.createElement('script')
			tag.src = uri
			tag.async = true
			tag.onload = () => {
				resolve()
			}
			document.head.appendChild(tag)
		}),
)

export const MastodonStatus = (props: { url: URL }) => {
	let el: HTMLDivElement | undefined
	const [visible, setVisible] = createSignal<boolean>(false)
	const [loaded, setLoaded] = createSignal<boolean>(false)

	const inView = createVisibilityObserver({ threshold: 0.01 })(() => el)

	createEffect(() => {
		if (inView() && !visible()) {
			setVisible(true)
		}
	})

	createEffect(() => {
		if (visible()) {
			setLoaded(true)
			void loadScriptAsync('https://chaos.social/embed.js').then(() => {
				setLoaded(true)
			})
		}
	})
	return (
		<>
			<div ref={el} />
			<Show when={loaded()}>
				<iframe
					src={props.url.toString()}
					class={'iframe'}
					width="400"
					allowfullscreen
				></iframe>
			</Show>
		</>
	)
}
