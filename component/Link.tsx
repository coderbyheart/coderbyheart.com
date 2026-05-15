import type { ParentProps } from 'solid-js'

export const withBase = (to: string): string => {
	const base = import.meta.env.BASE_URL
	if (!to.startsWith('/')) return to
	return `${base.replace(/\/$/, '')}${to}`
}

export const Link = (props: ParentProps<{ to: string }>) => (
	<a href={withBase(props.to)}>{props.children}</a>
)
