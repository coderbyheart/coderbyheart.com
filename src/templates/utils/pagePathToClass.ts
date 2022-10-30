export const pagePathToClass = (pagePath: string): string => {
	const s = pagePath.replace(/\//g, ' ').trim().split(' ').join('-')
	if (s === '') return 'home'
	return s
}
