import type { Photo } from '#util/loadMarkdownContent.ts'
import { localPhotoToCDN } from './localPhotoToCDN.ts'
import { migrateFromContentful } from './migrateFromContentful.ts'
import { usePhotos } from './usePhotos.ts'

export const replaceImage = async (image: Photo): Promise<Photo> => {
	if (!image.src.startsWith('http')) return localPhotoToCDN(image)
	if (image.src.startsWith('https://photos.coderbyheart.com/'))
		return usePhotos(image)

	return migrateFromContentful(image)
}
