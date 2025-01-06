import type { MarkdownContent } from '#content/loadMarkdownContent.ts'
import { name } from '#pages/info.ts'
import { useData } from 'vike-solid/useData'
import { Link } from './Link.tsx'
import { Markdown } from './Markdown.tsx'
import { ShowWhenVisible } from './ShowWhenVisible.tsx'
import { avatarUrl } from './avatarUrl.ts'

import styles from './Footer.module.css'
import heart from './heart.svg'

export const Footer = () => {
	const { pages } = useData<{ pages: Map<string, MarkdownContent> }>()

	const footer = pages.get('Footer')
	if (footer === undefined) throw new Error('Footer not found!')

	return (
		<footer class={styles.footer}>
			<section>
				<h1>
					<Link to={'/'}>
						coder.by(
						<img src={heart} alt="❤️" class={styles.heart} />)
					</Link>
				</h1>
				<ShowWhenVisible>
					<img
						class={styles.photo}
						alt={name}
						src={avatarUrl()}
						width="150"
						height="150"
					/>
				</ShowWhenVisible>
				<Markdown html={footer.html} />
				<p class="mt-2">
					© 2015-{new Date().getFullYear()}{' '}
					<a href="https://coderbyheart.com/" rel="me">
						{name}
					</a>
					.<br />
					All rights reserved.
				</p>
			</section>
		</footer>
	)
}
