import { Markdown } from '#component/Markdown.tsx'
import { Me } from '#component/Me.tsx'
import { Main } from '#layout/Main.tsx'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { useData } from 'vike-solid/useData'

import { Hero } from '#component/Hero/Hero.tsx'
import styles from './Start.module.css'

const Page = () => {
	const { pages } = useData<{ pages: Map<string, MarkdownContent> }>()

	const start = pages.get('Start')
	if (start === undefined) throw new Error('Start not found!')
	return (
		<>
			<Main class={styles.start}>
				<Me />
				<Markdown html={start.html} />
			</Main>
			{start.hero !== undefined && (
				<Hero alt={start.hero.alt} src={new URL(start.hero.src)} />
			)}
		</>
	)
}

export default Page
