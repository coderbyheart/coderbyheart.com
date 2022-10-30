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

export type TwitterStatus = {
	id: string
	/**
	 * @example "1070252678004072448"
	 */
	name: string
	/**
	 * @example "twitter/1070252678004072448.md"
	 */
	relativeDirectory: string
	/**
	 * @example "1070252678004072448"
	 */
	relativePath: string
	remark: {
		htmlAst: any
		frontmatter: {
			favorite_count: number // e.g. 156
			retweet_count: number // e.g. 207
			created_at: string // e.g. "2015-12-13T21:43:08.000Z"
			lang: string // e.g. "en"
			video_aspect_ratio?: number
		}
	}
}
