import { Markdown } from '#component/Markdown.tsx'
import { Title } from '#component/Title.tsx'
import { Main } from '#layout/Main.tsx'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { createMemo, Show } from 'solid-js'
import { useData } from 'vike-solid/useData'
import { usePageContext } from 'vike-solid/usePageContext'

const Page = () => {
	const data = useData<{ posts: Map<string, MarkdownContent> }>()
	const pageContext = usePageContext()
	const post = createMemo(() => {
		const p = data.posts.get(pageContext.routeParams.slug)
		if (p === undefined) throw new Error('Post not found!')
		return p
	})

	return (
		<Main class={'post'}>
			<Show when={post().title !== undefined}>
				<Title
					title={post().title}
					date={post().date}
					subtitle={post().subtitle}
				/>
			</Show>
			<Markdown html={post().html} />
		</Main>
	)
}

export default Page
