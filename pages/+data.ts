import { loadContentFromMarkdown } from '#util/loadContentFromMarkdown.ts'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { replaceImage } from '#util/replaceImages.ts'
import path from 'node:path'

export const data = async (): Promise<{
	pages: Map<string, MarkdownContent>
	posts: Map<string, MarkdownContent>
}> => {
	const pagesFolder = path.join(process.cwd(), 'content')
	const pages = await loadContentFromMarkdown(pagesFolder)
	for (const [key, page] of pages.entries()) {
		pages.set(key, {
			...page,
			hero:
				page.hero !== undefined
					? await replaceImage(page.hero, path.join(pagesFolder, key + '.md'))
					: undefined,
		})
	}

	const postsFolder = path.join(process.cwd(), 'content', 'post')
	const posts = await loadContentFromMarkdown(postsFolder)
	for (const [key, post] of posts.entries()) {
		posts.set(key, {
			...post,
			hero:
				post.hero !== undefined
					? await replaceImage(post.hero, path.join(postsFolder, key + '.md'))
					: undefined,
		})
	}

	return {
		pages,
		posts,
	}
}
