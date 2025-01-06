import { loadContentFromMarkdown } from '#content/loadContentFromMarkdown.ts'
import type { MarkdownContent } from '#content/loadMarkdownContent.ts'

export const data = async (): Promise<{
	pages: Map<string, MarkdownContent>
}> => ({
	pages: await loadContentFromMarkdown(),
})
