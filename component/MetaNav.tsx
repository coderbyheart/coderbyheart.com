import { Link, NavLink } from '#component/Link.tsx'
import { isSSR } from '#util/isSSR.ts'
import { debounce } from 'lodash-es'
import { createEffect, createSignal } from 'solid-js'
import { name, tagLine } from '../pages/info.ts'

const isScrolling = () => !isSSR && window.scrollY > 0

export const MetaNav = (props: { className?: string }) => {
	const [scrolling, setScrolling] = createSignal(isScrolling())

	createEffect(() => {
		if (isSSR) return

		const setScroll = () => setScrolling(isScrolling())

		const listener = debounce(setScroll, 250)
		window.addEventListener('scroll', listener)

		return () => {
			window.removeEventListener('scroll', listener)
		}
	})

	return (
		<nav
			class={`meta ${props.className ?? ''}`}
			classList={{ scrolling: scrolling() }}
		>
			<section>
				<div class={'shrink'}>
					<Link to={'/'}>
						<strong>{name}</strong>
						<span> &middot; {tagLine}</span>
					</Link>
				</div>
				<div class={'navLinks'}>
					<span>
						<NavLink to={'/archive'}>Blog</NavLink>
					</span>
					<span>
						<NavLink to={'/talks'}>Talks</NavLink>
					</span>
					<span>
						<NavLink to={'/communities'}>Communities</NavLink>
					</span>
				</div>
			</section>
		</nav>
	)
}
