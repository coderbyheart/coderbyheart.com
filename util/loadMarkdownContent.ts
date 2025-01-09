import { readdir, readFile } from 'node:fs/promises'
import path, { parse } from 'node:path'
import format from 'rehype-format'
import html from 'rehype-stringify'
import { remark } from 'remark'
import extract from 'remark-extract-frontmatter'
import frontmatter from 'remark-frontmatter'
import remark2rehype from 'remark-rehype'
import yaml from 'yaml'

const parseMarkdown = remark()
	.use(frontmatter, ['yaml'])
	.use(extract, { yaml: yaml.parse })
	.use(remark2rehype, { allowDangerousHtml: true })
	.use(format, {})
	.use(html, { allowDangerousHtml: true })

export type MarkdownContent = Record<string, any> & {
	slug: string
	html: string
	hero?: {
		alt: string // e.g. "Stokkøya"
		src: string // e.g. "https://images.ctfassets.net/bncv3c2gt878/3EXc2Uvcr9uEvpBQeytG9r/e0aca42ce58340d265410eaf43453280/50180400301_5da8837da3_k_d.jpg"
	}
}

export const loadMarkdownContent = async (): Promise<
	Array<MarkdownContent>
> => {
	const resourceFiles = (
		await readdir(path.join(process.cwd(), 'content'))
	).filter((f) => f.endsWith('.md'))

	return await Promise.all(
		resourceFiles.map(async (f) =>
			loadMarkdownContentFromFile(path.join(process.cwd(), 'content', f)),
		),
	)
}

export const loadMarkdownContentFromFile = async (
	file: string,
): Promise<MarkdownContent> => {
	const source = await readFile(file, 'utf-8')
	const md = await parseMarkdown.process(source)

	return {
		...md.data,
		html: md.value,
		slug: parse(file).base.replace(/\.md$/, ''),
	} as MarkdownContent
}
