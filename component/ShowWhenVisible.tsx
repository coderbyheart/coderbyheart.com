import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import type { ParentProps } from 'solid-js'
import { createEffect, createSignal, Show } from 'solid-js'

export const ShowWhenVisible = (props: ParentProps) => {
	let el: HTMLDivElement | undefined
	const [visible, setVisible] = createSignal<boolean>(false)

	const inView = createVisibilityObserver({ threshold: 0.01 })(() => el)

	createEffect(() => {
		if (inView() && !visible()) {
			setVisible(true)
		}
	})

	return (
		<div ref={el}>
			<Show when={visible()}>{props.children}</Show>
		</div>
	)
}
