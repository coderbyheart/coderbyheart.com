import { statSync } from 'fs'

export const exists = (path: string): boolean => {
	try {
		return statSync(path).isFile()
	} catch {
		return false
	}
}
