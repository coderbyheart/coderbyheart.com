declare module '*.svg' {
	const content: React.StatelessComponent<React.SVGAttributes<SVGElement>>
	export default content
}

declare module 'hast-to-hyperscript'

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
			noheadline: boolean | null
			date: string | null
		}
	}
}

export type PageContext = {
	page: Page
	pages: Page[]
	pagePath: string
}
