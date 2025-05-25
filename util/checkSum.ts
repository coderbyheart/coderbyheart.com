import crypto from 'node:crypto'

export const checkSum = (url: URL): string =>
	crypto.createHash('sha256').update(url.toString()).digest('hex')
