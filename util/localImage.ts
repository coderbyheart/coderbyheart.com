import type { Photo } from '#util/loadMarkdownContent.ts'
import { copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { baseDir } from './cacheDir.ts'
import { exists } from './exists.ts'

export const localImage = (image: Photo): Photo => {
	const mediaDir = path.resolve(baseDir, 'content', 'media')
	const rel = path.relative(mediaDir, image.src)
	if (rel.startsWith('..')) {
		throw new Error(`IMAGE ${image.src} is outside ${mediaDir}!`)
	}
	const dest = path.resolve(baseDir, 'public', 'media', rel)
	if (!exists(dest)) {
		mkdirSync(path.dirname(dest), { recursive: true })
		copyFileSync(image.src, dest)
	}
	return {
		...image,
		src: `/media/${rel.split(path.sep).join('/')}`,
	}
}
