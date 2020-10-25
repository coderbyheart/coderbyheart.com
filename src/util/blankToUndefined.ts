export const blankToUndefined = <A>(s?: A | null): A | undefined => {
	if (typeof s === 'string' && s.length === 0) return undefined
	if (s === null) return undefined
	return s
}
