import { loadContentFromMarkdown } from '#util/loadContentFromMarkdown.ts'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { replaceImage } from '#util/replaceImages.ts'
import path from 'node:path'

export const data = async (): Promise<{
	pages: Map<string, MarkdownContent>
	posts: Map<string, MarkdownContent>
}> => {
	const pages = await loadContentFromMarkdown(
		path.join(process.cwd(), 'content'),
	)
	for (const [key, page] of pages.entries()) {
		pages.set(key, {
			...page,
			hero: page.hero !== undefined ? await replaceImage(page.hero) : undefined,
		})
	}

	const posts = await loadContentFromMarkdown(
		path.join(process.cwd(), 'content', 'post'),
	)
	for (const [key, post] of posts.entries()) {
		posts.set(key, {
			...post,
			hero: post.hero !== undefined ? await replaceImage(post.hero) : undefined,
		})
	}

	return {
		pages,
		posts,
	}
}
