export type SiteMetaData = {
	title: string
	tagLine: string
	description: string
	gitHubUrl: string
	siteUrl: string
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
			title: string
			subtitle: string | null
			abstract: string | null
			noheadline: boolean | null
			date: string | null
		}
	}
}
