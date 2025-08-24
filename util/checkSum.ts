import crypto from 'node:crypto'
import { readFileSync } from 'node:fs'

export const checkSum = (url: URL): string =>
	crypto.createHash('sha256').update(url.toString()).digest('hex')

/**
 * Synchronous variant to compute the SHA-256 checksum of a local file's contents.
 */
export const fileCheckSum = (file: string | URL): string =>
	crypto.createHash('sha256').update(readFileSync(file)).digest('hex')
