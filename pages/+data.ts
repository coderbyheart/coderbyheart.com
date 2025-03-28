import { loadContentFromMarkdown } from '#util/loadContentFromMarkdown.ts'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'
import { replaceImage } from '#util/replaceImages.ts'

export const data = async (): Promise<{
	pages: Map<string, MarkdownContent>
}> => {
	const pages = await loadContentFromMarkdown()
	for (const [key, page] of pages.entries()) {
		pages.set(key, {
			...page,
			hero: page.hero !== undefined ? await replaceImage(page.hero) : undefined,
		})
	}
	return {
		pages,
	}
}
