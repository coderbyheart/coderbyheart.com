export type SiteMetaData = {
	title: string
	tagLine: string
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
			title: string
			subtitle: string | null
			abstract: string | null
			hero: string | null
			noheadline: boolean | null
		}
	}
}

export type GatsbyLocation = {
	ancestorOrigins: Record<string, any>
	href: string
	origin: string
	protocol: string
	host: string
	hostname: string
	port: string
	pathname: string
	search: string
	hash: string
}
