import type { Photo } from '#util/loadMarkdownContent.ts'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { fromEnv } from '@bifravst/from-env'
import run from '@bifravst/run'
import {
	copyFileSync,
	createReadStream,
	mkdirSync,
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

// Animated GIFs must be served as the original file, because the CDN
// transforms them to WEBP and only the first frame is preserved. Move the
// downloaded GIF into the post's content/media folder, rewrite the markdown
// source so it references the local copy, then throw so the resulting changes
// can be committed.
const importGifToContent = (params: {
	originalURL: string
	sourceFile: string
	cs: string
	sourceGif: string
}): never => {
	const { originalURL, sourceFile, cs, sourceGif } = params
	const slug = path.parse(sourceFile).name
	const urlName = path.parse(new URL(originalURL).pathname).name
	const filename = `${urlName.length > 0 ? urlName + '-' : ''}${cs.slice(0, 8)}.gif`
	const targetDir = path.resolve(baseDir, 'content', 'media', slug)
	const targetPath = path.join(targetDir, filename)
	mkdirSync(targetDir, { recursive: true })
	if (!exists(targetPath)) copyFileSync(sourceGif, targetPath)

	const relPath = `../media/${slug}/${filename}`
	const source = readFileSync(sourceFile, 'utf-8')
	const updated = source.replaceAll(originalURL, relPath)
	if (updated === source) {
		throw new Error(
			`Could not find ${originalURL} in ${sourceFile} to replace with ${relPath}.`,
		)
	}
	writeFileSync(sourceFile, updated, 'utf-8')

	throw new Error(
		`Imported GIF ${originalURL} to ${targetPath} and rewrote ${sourceFile} to use ${relPath}. Commit the changes and re-run the build.`,
	)
}

const s3 = new S3Client({})
const { bucketName, photosCDNEndpoint } = fromEnv({
	bucketName: 'PHOTOS_BUCKET_NAME',
	photosCDNEndpoint: 'PHOTOS_CDN_ENDPOINT',
})(process.env)

const tmp = tempDir()

/**
 * Once all images have been migrated to S3, this function can be removed.
 */
export const migrateFromContentful = async (
	image: Photo,
	sourceFile: string,
): Promise<Photo> => {
	const src = new URL(image.src)
	const cs = checkSum(src)
	const metaFilePath = path.join(cacheDir, cs + '.json')

	if (exists(metaFilePath)) {
		const cdn = JSON.parse(readFileSync(metaFilePath, 'utf-8'))
		if (cdn.type === 'GIF') {
			importGifToContent({
				originalURL: image.src,
				sourceFile,
				cs,
				sourceGif: path.join(cacheDir, cs + '.gif'),
			})
		}
		return {
			...image,
			cdn,
		}
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

	if (type === 'GIF') {
		importGifToContent({
			originalURL: image.src,
			sourceFile,
			cs,
			sourceGif: localFilePath,
		})
	}

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
