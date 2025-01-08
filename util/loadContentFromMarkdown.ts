import type { MarkdownContent } from './loadMarkdownContent.ts'
import { loadMarkdownContent } from './loadMarkdownContent.ts'

export const loadContentFromMarkdown = async (): Promise<
	Map<string, MarkdownContent>
> => {
	const result: Map<string, MarkdownContent> = new Map()

	const content = await loadMarkdownContent()

	for (const page of content) {
		result.set(page.slug, page)
	}
	return result
}
