import { loadContentFromMarkdown } from '#util/loadContentFromMarkdown.ts'
import path from 'node:path'

export const onBeforePrerenderStart = async (): Promise<string[]> => {
	const posts = await loadContentFromMarkdown(
		path.join(process.cwd(), 'content', 'post'),
	)
	return Array.from(posts.keys()).map((slug) => `/${slug}`)
}
