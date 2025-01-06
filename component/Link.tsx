import type { ParentProps } from 'solid-js'

export const Link = (props: ParentProps<{ to: string }>) => (
	<a href={props.to}>{props.children}</a>
)
