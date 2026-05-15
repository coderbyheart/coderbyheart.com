import type { Root } from 'mdast'
import path from 'node:path'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { replaceImage } from './replaceImages.ts'

type HTMLElement = {
	type: 'element'
	tagName: string // e.g. 'div', 'span', etc.
	properties: Record<string, unknown>
	children?: Array<HTMLElement>
}

type ImageElement = HTMLElement & {
	type: 'element'
	tagName: 'img' // e.g. 'img'
	properties: {
		src: string
		alt: string
		width?: number
		height?: number
	}
}
type PictureElement = {
	type: 'element'
	tagName: 'picture'
	properties: {
		style: string
		['data-cdn']: boolean
	}
	children: Array<
		| {
				type: 'element'
				tagName: 'source'
				properties: {
					srcset: string
				}
		  }
		| ImageElement
	>
}

export const replaceImagesInMarkdown =
	(sourceFile: string): Plugin<[], Root> =>
	() =>
	async (tree) => {
		const imageNodes: Array<ImageElement> = []

		visit(tree, (node) => {
			if ('tagName' in node && node.tagName === 'img') {
				imageNodes.push(node as unknown as ImageElement)
			}
		})

		for (const node of imageNodes) {
			const cdnPhoto = await replaceImage({
				alt: node.properties.alt,
				src: node.properties.src.startsWith('.')
					? path.resolve(path.parse(sourceFile).dir, node.properties.src)
					: node.properties.src,
			})

			if (cdnPhoto.cdn === undefined) {
				node.properties.src = cdnPhoto.src
				continue
			}

			// Replace the image with a picture element if the CDN is available
			// and the image is not a placeholder
			if (cdnPhoto.cdn !== undefined) {
				const picture: PictureElement = {
					type: 'element',
					tagName: 'picture',
					properties: {
						style: `aspect-ratio: ${cdnPhoto.cdn.dim.width} / ${cdnPhoto.cdn.dim.height}`,
						['data-cdn']: true,
					},
					children: [
						{
							type: 'element',
							tagName: 'source',
							properties: {
								srcset: cdnPhoto.cdn.url,
							},
						},
						{
							type: 'element',
							tagName: 'img',
							properties: {
								src: cdnPhoto.cdn.preview,
								alt: cdnPhoto.alt,
								width: cdnPhoto.cdn.dim.width,
								height: cdnPhoto.cdn.dim.height,
							},
						},
					],
				}

				//const picture: PictureElement = node as unknown as PictureElement
				const hero: HTMLElement = node
				hero.tagName = 'aside'
				hero.properties = {
					class: 'hero',
				}
				hero.children = [picture]
			}
		}
	}
