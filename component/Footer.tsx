import { name } from '#pages/info.ts'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { useData } from 'vike-solid/useData'
import { Ago } from './Ago.tsx'
import { Link } from './Link.tsx'
import { Markdown } from './Markdown.tsx'
import { ShowWhenVisible } from './ShowWhenVisible.tsx'
import { avatarUrl } from './avatarUrl.ts'

import heart from './heart.svg'

export const Footer = () => {
	const { pages } = useData<{ pages: Map<string, MarkdownContent> }>()

	const footer = pages.get('Footer')
	if (footer === undefined) throw new Error('Footer not found!')

	return (
		<footer class={'page'}>
			<section>
				<h1>
					<Link to={'/'}>
						coder.by(
						<img src={heart} alt="❤️" class={'heart'} />)
					</Link>
				</h1>
				<ShowWhenVisible>
					<img
						class={'photo'}
						alt={name}
						src={avatarUrl()}
						width="150"
						height="150"
					/>
				</ShowWhenVisible>
				<Markdown html={footer.html} />
				<div class="two-columns mt-4">
					<p>
						© 2015-{new Date().getFullYear()}{' '}
						<a href="https://coderbyheart.com/" rel="me">
							{name}
						</a>
						.<br />
						All rights reserved.
					</p>
					<p class="dim">
						<br />
						<abbr class="me-1" title="Version">
							{VERSION}
						</abbr>
						&middot;
						<abbr class={'ms-1'} title="Last updated">
							<time datetime={BUILD_TIME}>
								<Ago time={new Date(BUILD_TIME)} />
							</time>
						</abbr>
					</p>
				</div>
			</section>
		</footer>
	)
}
