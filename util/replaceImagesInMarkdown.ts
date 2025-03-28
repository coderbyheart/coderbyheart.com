import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { replaceImage } from './replaceImages.ts'

type ImageElement = {
	type: 'element'
	tagName: 'img'
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

export const replaceImagesInMarkdown: Plugin<[], Root> = () => async (tree) => {
	const images: Array<ImageElement> = []

	visit(tree, (node) => {
		if ('tagName' in node && node.tagName === 'img') {
			images.push(node as unknown as ImageElement)
		}
	})

	for (const image of images) {
		const cdnPhoto = await replaceImage({
			alt: image.properties.alt,
			src: image.properties.src,
		})

		if (cdnPhoto.cdn !== undefined) {
			const picture: PictureElement = image as unknown as PictureElement
			picture.tagName = 'picture'
			picture.properties = {
				style: `aspect-ratio: ${cdnPhoto.cdn.dim.width} / ${cdnPhoto.cdn.dim.height}`,
				['data-cdn']: true,
			}
			picture.children = [
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
			]
		}
	}
}
