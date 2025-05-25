import type { Photo } from '#util/loadMarkdownContent.ts'
import { readFileSync, writeFileSync } from 'node:fs'
import path, { parse } from 'node:path'
import { cacheDir } from './cacheDir.ts'
import { checkSum } from './checkSum.ts'
import { exists } from './exists.ts'
import { contentTypeToType } from './typeToExtension.ts'

/**
 * Use a photo published on photos.coderbyheart.com.
 */
export const usePhotos = async (image: Photo): Promise<Photo> => {
	const src = new URL(image.src)
	const cs = checkSum(src)
	const metaFilePath = path.join(cacheDir, cs + '.json')

	if (exists(metaFilePath))
		return {
			...image,
			cdn: JSON.parse(readFileSync(metaFilePath, 'utf-8')),
		}

	const meta = (await (
		await fetch(
			`https://photos.coderbyheart.com/data/photos/${parse(src.pathname).name}.json`,
		)
	).json()) as {
		url: string // e.g. 'https://7w7z6ydf2htamqdsm6nbxm7sma0nkltc.lambda-url.eu-central-1.on.aws/2025-05-25/IMG20250525112303.jpg'
		size: number // e.g. 6843202
		image: {
			width: number // e.g. 2250;
			height: number // e.g. 4000
		}
		thumbnail: string // e.g. 'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACwAQCdASoQABAABUB8JQBOgCKFydlAAPfPWgic3qw2UTxKdl2LWaNmzKnccP+i7LaiZUky6A5Bpwb1wEBwld+B+v1//KCGljxoAA=='
		preview: string // e.g. 'data:image/webp;base64,UklGRkoCAABXRUJQVlA4ID4CAABQDgCdASpAAHIAPzmEuFavJ743Kxuck8AnCUAaqj/8b+6Rp5g0S5ob2dcA7hEGR6B87lsUgbtlip409aBRcEGqCc2lcGdpVQTUH4ySuqEVCrJLQlTsNzBPrXn0e4TtIa8AtnkJX3fpsMhiJd3bHqzDdQXMiM0foa1ypFwA/u25r8qrg7zAcN/hQsO4ZfXr4Ssn0ynHdZaAqmhS/lgqvdaen36EzanjdBqHaLRRkzjcJuB7FqN1z3JNMZjV0fC3jLg82rhJxfRxJlKnCILjJU6zAohDSqcYWrDHYwEAUNeWSYRJIstIfoCGDXy+BB1fU1x2HWyCJEGrAovplZc4lHQKXAnLpW/ospymRQ+JlY20UbLw5ArnpnnsKfJ+xurhkxRUjlagzm0Nc7TfmSozRlBLW0eRq34sxj+vA33PxT5HNrYgg6Wq9d2BwQNdrPjTAIyaIBNyDH8sCHqVX3l9uzueyY/a2v0NtYITj0JnEz2TdFV9wv3fsEBoF7YNLKTo+9reDZQ3OOBb2C0mQ8T+NRq6zZPsJ4C+VOYVAnsl9hiUxixD8xId4A/4PkW8LdfNhzuRvL7fl/HiYuDUlPDaJRsOLtwsjXbixIA2LspOaS09kULwK03QWokmm+LMC06j4V/YQXNO1acfuxD0uW4xAZnV8tj05vK4iGZ5kZoZCdNW0GRamWEYTHP+Ftkr2l8o5uEKD4u7eUSF3PQge5SHqJlgCJLXzPIjg+aMhg4op8tLIpM4lqGkRtaglfes4AAA'
		contentType: string // e.g. 'image/jpeg'
	}

	const cdn = {
		url: meta.url,
		size: meta.size, // e.g. 5106419
		dim: {
			width: meta.image.width, //e.g. 3008,
			height: meta.image.height, //e.g. 4000,
		},
		thumbnail: meta.thumbnail,
		preview: meta.preview,
		type: contentTypeToType(meta.contentType),
	}
	writeFileSync(metaFilePath, JSON.stringify(cdn, null, 2), 'utf-8')

	return {
		...image,
		cdn,
	}
}
