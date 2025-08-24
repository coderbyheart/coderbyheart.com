import type { MarkdownContent } from './loadMarkdownContent.ts'
import { loadMarkdownContent } from './loadMarkdownContent.ts'

export const loadContentFromMarkdown = async (
	folder: string,
): Promise<Map<string, MarkdownContent>> => {
	const result: Map<string, MarkdownContent> = new Map()

	const content = await loadMarkdownContent(folder)

	for (const page of content) {
		result.set(page.slug, page)
	}
	return result
}
