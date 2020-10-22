export type SiteMetaData = {
	title: string
	tagLine: string
	description: string
	gitHubUrl: string
	siteUrl: string
	twitter: string
	defaultCard: string
}

export type Page = {
	id: string
	/**
	 * @example "Home"
	 */
	name: string
	/**
	 * @example "home/index.md"
	 */
	relativeDirectory: string
	/**
	 * @example "home"
	 */
	relativePath: string
	remark: {
		htmlAst: any
		headings: {
			id: string
			depth: number
			value: string
		}[]
		frontmatter: {
			title: string | null
			subtitle: string | null
			abstract: string | null
			noheadline: boolean | null
			date: string | null
			card: string | null
			lang: string | null
		}
	}
}
