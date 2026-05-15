import type { Photo } from '#util/loadMarkdownContent.ts'
import { localImage } from './localImage.ts'
import { localPhotoToCDN } from './localPhotoToCDN.ts'
import { migrateFromContentful } from './migrateFromContentful.ts'
import { usePhotos } from './usePhotos.ts'

export const replaceImage = async (
	image: Photo,
	sourceFile: string,
): Promise<Photo> => {
	if (!image.src.startsWith('http')) {
		if (image.src.toLowerCase().endsWith('.svg')) return localImage(image)
		if (image.src.toLowerCase().endsWith('.gif')) return localImage(image)
		return localPhotoToCDN(image)
	}
	if (image.src.startsWith('https://photos.coderbyheart.com/'))
		return usePhotos(image)

	return migrateFromContentful(image, sourceFile)
}
