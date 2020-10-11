export const classNames = (args: Record<string, boolean | undefined>): string =>
	Object.entries(args)
		.map(([k, v]) => (v === true ? k : ''))
		.join(' ')
		.trim()
		.replace(/ {2,}/g, ' ')
