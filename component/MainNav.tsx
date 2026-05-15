import { NavLink, withBase } from './Link.tsx'

import heart from './heart.svg'

export const MainNav = ({ className }: { className?: string }) => (
	<nav class={`main ${className ?? ''}`}>
		<div class={'wrapper'}>
			<a class={'logo'} href={withBase('/')}>
				coder.by(
				<img src={heart} alt="❤️" class={'heart'} />)
			</a>
			<div class={'links'}>
				<NavLink to={'/'}>Home</NavLink>
				<NavLink to={'/archive'}>Blog</NavLink>
				<NavLink to={'/talks'}>Talks</NavLink>
				<NavLink to={'/communities'}>Communities</NavLink>
			</div>
		</div>
	</nav>
)
