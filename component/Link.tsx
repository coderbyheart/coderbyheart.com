import type { ParentProps } from 'solid-js'
import { usePageContext } from 'vike-solid/usePageContext'

export const withBase = (to: string): string => {
	const base = import.meta.env.BASE_URL
	if (!to.startsWith('/')) return to
	return `${base.replace(/\/$/, '')}${to}`
}

const isActive = (pathname: string, to: string): boolean => {
	if (to === '/') return pathname === '/'
	return pathname === to || pathname.startsWith(`${to}/`)
}

export const Link = (props: ParentProps<{ to: string }>) => (
	<a href={withBase(props.to)}>{props.children}</a>
)

export const NavLink = (props: ParentProps<{ to: string }>) => {
	const pageContext = usePageContext()
	const active = () => isActive(pageContext.urlPathname, props.to)
	return (
		<a href={withBase(props.to)} class={active() ? 'active' : undefined}>
			{props.children}
		</a>
	)
}
