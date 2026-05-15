import { Link } from '#component/Link.tsx'
import { Title } from '#component/Title.tsx'
import { Main } from '#layout/Main.tsx'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { For, Show } from 'solid-js'
import { useData } from 'vike-solid/useData'

const Page = () => {
	const { pages, posts } = useData<{
		pages: Map<string, MarkdownContent>
		posts: Map<string, MarkdownContent>
	}>()

	const archive = pages.get('Archive')
	if (archive === undefined) throw new Error('Archive not found!')

	const sorted = [...posts.values()]
		.filter((p) => p.date !== undefined)
		.sort((a, b) => (b.date as string).localeCompare(a.date as string))

	const yearState = { lastYear: -1 }

	return (
		<Main class={'archive'}>
			<Show when={archive.title !== undefined}>
				<Title
					title={archive.title}
					date={archive.date}
					subtitle={archive.subtitle}
				/>
			</Show>
			<article class="content">
				<For each={sorted}>
					{(post) => {
						const year = new Date(post.date as string).getFullYear()
						const showYear = yearState.lastYear !== year
						yearState.lastYear = year
						return (
							<>
								<Show when={showYear}>
									<h2>{year}</h2>
								</Show>
								<p>
									<Link to={`/${post.slug}`}>{post.title}</Link>
									<br />
									{post.abstract}
								</p>
							</>
						)
					}}
				</For>
			</article>
		</Main>
	)
}

export default Page
