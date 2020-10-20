export const blankToUndefined = <T>(s: T | null): T | undefined =>
	s === null || (typeof s === 'string' && s.length === 0) ? undefined : s
