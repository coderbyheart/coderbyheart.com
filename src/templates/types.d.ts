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
