export type SiteMetaData = {
	title: string
	subTitle: string
	description: string
	gitHubUrl: string
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
			hero: string | null
		}
	}
}
