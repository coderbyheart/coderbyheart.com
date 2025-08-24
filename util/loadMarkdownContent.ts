import { readdir, readFile } from 'node:fs/promises'
import path, { parse } from 'node:path'
import format from 'rehype-format'
import html from 'rehype-stringify'
import { remark } from 'remark'
import extract from 'remark-extract-frontmatter'
import frontmatter from 'remark-frontmatter'
import remark2rehype from 'remark-rehype'
import yaml from 'yaml'
import { replaceImagesInMarkdown } from './replaceImagesInMarkdown.ts'

const parseMarkdown = remark()
	.use(frontmatter, ['yaml'])
	.use(extract, { yaml: yaml.parse })
	.use(remark2rehype, { allowDangerousHtml: true })
	.use(format, {})
	.use(html, { allowDangerousHtml: true })
	.use(replaceImagesInMarkdown)

export type CDNPhoto = {
	url: string // e.g. 'https://7w7z6ydf2htamqdsm6nbxm7sma0nkltc.lambda-url.eu-central-1.on.aws/coderbyheart.com/media/18248d974deb8473d2145868b5cbd133800ac415c2576d34b7b3af432eacd486'
	size: number // e.g. 618090
	dim: {
		width: number // e.g. 2045;
		height: number // e.g. 1152
	}
	thumbnail: string // e.g. 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQABAABUB8JbACdADcDjs0AADoE7M0KBjrhR+oZpkY1qaTZfL7grjZJ1Hkl4+uLTpU832XJRz302ma3sQAAA=='
	preview: string // e.g. 'data:image/webp;base64,UklGRlwBAABXRUJQVlA4IFABAACQCQCdASpAACQAPzmWw1qvKqekKBVY4eAnCWQAsylqRZhGkiLAdiytrxGjH2nZpGK1olETvAvfhHFmynYmugb0RiWiUdvnLs2LSf+WA7XbK5eUaNAAAPnWhdy+YvpXPP4q/7y6RFaNESXgsaGqTQxQ+m0/ZP1o0NlCaCuW7IZNF7GC19IWU/Qh6Wt6jNTRKsfepo/EEyFSFY4LCVld7sHQ1F9MWKe9SDyB8sE5ugKoo+kKjQ/0pFCB9W4TFM8jJv6Ir3V/CcWGJOkkW5whdGPuVHMRAPJ4/4k+8pwN4dd8o5X8iQrc/Wm7cGtEEmg3sVfKBKQfXuz6dHnR2W0QmA/tllaA2KmD8Wc9Df2liA00FHDK8FHZbGIq6WEqs7KjbbxFw09q4Es4/ikvmRDcHPLIMFkK+gdgdTdLEgJ0ZoCiqwdle2kyEJahSDGDIMUAAAA='
	type: string // e.g. 'JPEG'
}

export type PhotoOnCDN = Photo & {
	cdn: CDNPhoto
}

export type Photo = {
	alt: string // e.g. "Stokkøya"
	src: string // e.g. "https://images.ctfassets.net/bncv3c2gt878/3EXc2Uvcr9uEvpBQeytG9r/e0aca42ce58340d265410eaf43453280/50180400301_5da8837da3_k_d.jpg"
	cdn?: CDNPhoto
}

export type MarkdownContent = Record<string, any> & {
	slug: string
	html: string
	hero?: Photo
	title?: string
	subtitle?: string
}

export const loadMarkdownContent = async (
	folder: string,
): Promise<Array<MarkdownContent>> => {
	const resourceFiles = (await readdir(folder)).filter((f) => f.endsWith('.md'))

	return await Promise.all(
		resourceFiles.map(async (f) =>
			loadMarkdownContentFromFile(path.join(folder, f)),
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
