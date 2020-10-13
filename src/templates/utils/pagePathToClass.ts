export const pagePathToClass = (pagePath: string): string => {
	const s = pagePath.replace(/\//, ' ').trim().split(' ').join('-')
	if (s === '') return 'home'
	return s
}
