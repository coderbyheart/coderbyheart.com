import { loadContentFromMarkdown } from '#util/loadContentFromMarkdown.ts'
import type { MarkdownContent } from '#util/loadMarkdownContent.ts'

export const data = async (): Promise<{
	pages: Map<string, MarkdownContent>
}> => ({
	pages: await loadContentFromMarkdown(),
})
