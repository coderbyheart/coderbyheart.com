import type { ParentProps } from 'solid-js'

export const Main = (props: ParentProps<{ class?: string }>) => (
	<main class={`${props.class ?? ''} main`}>{props.children}</main>
)
