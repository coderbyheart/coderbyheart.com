import type { Photo } from '#util/loadMarkdownContent.ts'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { fromEnv } from '@bifravst/from-env'
import run from '@bifravst/run'
import Bottleneck from 'bottleneck'
import {
	createReadStream,
	readFileSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { cacheDir } from './cacheDir.ts'
import { fileCheckSum } from './checkSum.ts'
import { exists } from './exists.ts'

const s3 = new S3Client()
const { bucketName, photosCDNEndpoint } = fromEnv({
	bucketName: 'PHOTOS_BUCKET_NAME',
	photosCDNEndpoint: 'PHOTOS_CDN_ENDPOINT',
})(process.env)

const limiter = new Bottleneck({
	maxConcurrent: 2,
})

const upload = async (image: Photo): Promise<Photo> => {
	const cs = fileCheckSum(image.src)
	const metaFilePath = path.join(cacheDir, cs + '.json')

	if (exists(metaFilePath))
		return {
			...image,
			cdn: JSON.parse(readFileSync(metaFilePath, 'utf-8')),
		}

	const originalInfo = await run({ command: 'identify', args: [image.src] })
	const [, type, dimensions, ,] = originalInfo.split(' ') // /tmp/f5bb4094-29eb-44ff-9c29-feaf5d2ce7d4 JPEG 3008x4000 3008x4000+0+0 8-bit sRGB 2.49426MiB 0.010u 0:00.004
	if (type !== 'JPG' && type !== 'JPEG' && type !== 'PNG' && type !== 'GIF')
		throw new Error(`Unsupported image type: ${type} in ${image.src}!`)
	const [width, height] = dimensions.split('x').map(Number)
	if (isNaN(width) || isNaN(height))
		throw new Error(`Invalid dimensions: ${dimensions} in ${image.src}!`)

	const Key = `coderbyheart.com/media/${cs}`
	try {
		await s3.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key,
				Body: createReadStream(image.src),
				IfNoneMatch: '*',
			}),
		)
	} catch (err) {
		if ((err as any).Code !== 'PreconditionFailed') {
			console.error(
				`Failed to upload ${image.src} to S3!: ${(err as Error).message}`,
			)
			throw err
		}
		// The image already exists in the bucket, which is fine, we can proceed to generate the CDN URLs
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
	if (orig === null)
		throw new Error(
			`Failed to convert ${image.src} ${photosCDNEndpoint}${Key}?f=placeholder!`,
		)

	const cdnURL = `${photosCDNEndpoint}${Key}`

	const cdn = {
		url: cdnURL,
		size: statSync(image.src).size, // e.g. 5106419
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

export const localPhotoToCDN = async (image: Photo): Promise<Photo> =>
	limiter.schedule(async () => upload(image))
