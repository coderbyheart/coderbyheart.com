import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import type { PageContext } from 'vike/types'
import { name, tagLine } from '../info.ts'

export const title = (pageContext: PageContext): string => {
	const data = pageContext.data as
		{ posts?: Map<string, MarkdownContent> } | undefined
	const slug = pageContext.routeParams?.slug
	const postTitle =
		slug !== undefined ? data?.posts?.get(slug)?.title : undefined
	return postTitle !== undefined
		? `${postTitle} · ${name} · ${tagLine}`
		: `${name} · ${tagLine}`
}
