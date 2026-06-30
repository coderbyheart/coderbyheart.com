import { Markdown } from '#component/Markdown.tsx'
import { Title } from '#component/Title.tsx'
import { Main } from '#layout/Main.tsx'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { Show } from 'solid-js'
import { useData } from 'vike-solid/useData'

const Page = () => {
	const { pages } = useData<{ pages: Map<string, MarkdownContent> }>()

	const socials = pages.get('Socials')
	if (socials === undefined) throw new Error('Socials not found!')
	return (
		<Main class={'socials'}>
			<Show
				when={socials.title !== undefined || socials.subtitle !== undefined}
			>
				<Title
					title={socials.title}
					date={socials.date}
					subtitle={socials.subtitle}
					noheadline={socials.noheadline}
				/>
			</Show>
			<Markdown html={socials.html} />
		</Main>
	)
}

export default Page
