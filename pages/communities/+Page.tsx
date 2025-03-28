import { Markdown } from '#component/Markdown.tsx'
import { Title } from '#component/Title.tsx'
import { Main } from '#layout/Main.tsx'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { Show } from 'solid-js'
import { useData } from 'vike-solid/useData'

const Page = () => {
	const { pages } = useData<{ pages: Map<string, MarkdownContent> }>()

	const communities = pages.get('Communities')
	if (communities === undefined) throw new Error('Communities not found!')
	return (
		<Main class={'communities'}>
			<Show when={communities.title !== undefined}>
				<Title
					title={communities.title}
					date={communities.date}
					subtitle={communities.subtitle}
				/>
			</Show>
			<Markdown html={communities.html} />
		</Main>
	)
}

export default Page
