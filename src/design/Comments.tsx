import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus'
import { Page } from '../site'
import { useInView } from 'react-intersection-observer'

const isSSR = typeof window === 'undefined'

export const Comments = ({
	page,
	siteUrl,
}: {
	page: Page
	siteUrl: string
}) => {
	const { ref, inView } = useInView({ triggerOnce: true })
	if (isSSR) return null
	const disqusConfig = {
		url: `${siteUrl + location.pathname}`,
		identifier: page.name,
		title: page.remark.frontmatter.title,
	}
	return (
		<section ref={ref}>
			{inView && (
				<>
					<h2>Comments</h2>
					<Disqus config={disqusConfig} />
				</>
			)}
		</section>
	)
}
