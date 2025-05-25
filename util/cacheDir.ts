import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const baseDir = path.resolve(__dirname, '..')

export const cacheDir = path.resolve(baseDir, 'content', 'media', 'cache')
