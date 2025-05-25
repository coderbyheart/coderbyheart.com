import type { Photo } from '#util/loadMarkdownContent.ts'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { fromEnv } from '@bifravst/from-env'
import run from '@bifravst/run'
import {
	copyFileSync,
	createReadStream,
	readFileSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { baseDir, cacheDir } from './cacheDir.ts'
import { checkSum } from './checkSum.ts'
import { getMediaEntry } from './contentful/getMediaEntry.ts'
import { exists } from './exists.ts'
import { tempDir } from './tempDir.ts'
import { typeToExtension } from './typeToExtension.ts'

const s3 = new S3Client({})
const { bucketName, photosCDNEndpoint } = fromEnv({
	bucketName: 'PHOTOS_BUCKET_NAME',
	photosCDNEndpoint: 'PHOTOS_CDN_ENDPOINT',
})(process.env)

const tmp = tempDir()

/**
 * Once all images have been migrated to S3, this function can be removed.
 */
export const migrateFromContentful = async (image: Photo): Promise<Photo> => {
	const src = new URL(image.src)
	const cs = checkSum(src)
	const metaFilePath = path.join(cacheDir, cs + '.json')

	if (exists(metaFilePath))
		return {
			...image,
			cdn: JSON.parse(readFileSync(metaFilePath, 'utf-8')),
		}

	const maybeMediaEntry = await getMediaEntry(cs)
	const downloadURL =
		maybeMediaEntry !== null ? `https:${maybeMediaEntry}` : src.toString()

	console.debug(downloadURL, 'Downloading...')
	const response = await fetch(downloadURL)
	const tempFile = path.join(tmp, cs)
	writeFileSync(tempFile, Buffer.from(await response.arrayBuffer()), 'binary')

	const originalInfo = await run({ command: 'identify', args: [tempFile] })
	const [, type, dimensions, ,] = originalInfo.split(' ') // /tmp/f5bb4094-29eb-44ff-9c29-feaf5d2ce7d4 JPEG 3008x4000 3008x4000+0+0 8-bit sRGB 2.49426MiB 0.010u 0:00.004
	if (type !== 'JPG' && type !== 'JPEG' && type !== 'PNG' && type !== 'GIF')
		throw new Error(`Unsupported image type: ${type} in ${downloadURL}!`)
	const [width, height] = dimensions.split('x').map(Number)
	if (isNaN(width) || isNaN(height))
		throw new Error(`Invalid dimensions: ${dimensions} in ${downloadURL}!`)

	const localFilePath = path.join(
		baseDir,
		'content',
		'media',
		'cache',
		cs + '.' + typeToExtension(type),
	)

	copyFileSync(tempFile, localFilePath)
	console.log(downloadURL, localFilePath)

	const Key = `coderbyheart.com/media/${cs}`
	try {
		await s3.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key,
				Body: createReadStream(localFilePath),
				IfNoneMatch: '*',
			}),
		)
	} catch (err) {
		console.error(
			`Failed to upload ${downloadURL} to S3!: ${(err as Error).message}`,
		)
	}

	// Preview images
	// @see https://transitive-bullshit.github.io/lqip-modern/
	const thumbnail = await fetch(`${photosCDNEndpoint}${Key}?f=placeholder`, {
		redirect: 'follow',
	})
	const preview = await fetch(`${photosCDNEndpoint}${Key}?f=preview`, {
		redirect: 'follow',
	})
	const orig = thumbnail.headers.get('x-amz-meta-original') // e.g. '/2023-12-10/IMG20231207121810.jpg JPEG 3456x4608 8-bit sRGB'
	if (orig === null) throw new Error(`Failed to convert ${downloadURL}!`)

	const cdnURL = `${photosCDNEndpoint}${Key}`

	const cdn = {
		url: cdnURL,
		size: statSync(localFilePath).size, // e.g. 5106419
		dim: {
			width, //e.g. 3008,
			height, //e.g. 4000,
		},
		thumbnail: `data:image/webp;base64,${Buffer.from(
			await thumbnail.arrayBuffer(),
		).toString('base64')}`,
		preview: `data:image/webp;base64,${Buffer.from(
			await preview.arrayBuffer(),
		).toString('base64')}`,
		type,
	}
	writeFileSync(metaFilePath, JSON.stringify(cdn, null, 2), 'utf-8')

	return {
		...image,
		cdn,
	}
}
