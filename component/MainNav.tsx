import { Link } from './Link.tsx'

import heart from './heart.svg'

export const MainNav = ({ className }: { className?: string }) => (
	<nav class={`main ${className ?? ''}`}>
		<div class={'wrapper'}>
			<a class={'logo'} href={'/'}>
				coder.by(
				<img src={heart} alt="❤️" class={'heart'} />)
			</a>
			<div class={'content'}>
				<Link to={'/'}>Home</Link>
				<Link to={'/archive'}>Blog</Link>
				<Link to={'/talks'}>Talks</Link>
				<Link to={'/communities'}>Communities</Link>
			</div>
		</div>
	</nav>
)
