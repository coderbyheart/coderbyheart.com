import { Markdown } from '#component/Markdown.tsx'
import { Title } from '#component/Title.tsx'
import { Main } from '#layout/Main.tsx'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { Show } from 'solid-js'
import { useData } from 'vike-solid/useData'

const Page = () => {
	const { pages } = useData<{ pages: Map<string, MarkdownContent> }>()

	const talks = pages.get('Talks')
	if (talks === undefined) throw new Error('Talks not found!')
	return (
		<Main class={'talks'}>
			<Show when={talks.title !== undefined}>
				<Title
					title={talks.title}
					date={talks.date}
					subtitle={talks.subtitle}
				/>
			</Show>
			<Markdown html={talks.html} />
		</Main>
	)
}

export default Page
