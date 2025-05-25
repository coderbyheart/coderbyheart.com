import type { Photo } from '#util/loadMarkdownContent.ts'
import { migrateFromContentful } from './migrateFromContentful.ts'
import { usePhotos } from './usePhotos.ts'

export const replaceImage = async (image: Photo): Promise<Photo> => {
	if (!image.src.startsWith('http')) return image
	if (image.src.startsWith('https://photos.coderbyheart.com/'))
		return usePhotos(image)

	return migrateFromContentful(image)
}
