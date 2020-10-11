import React from 'react'
import * as hastToHyperscript from 'hast-to-hyperscript'

export const renderHtmlAstToReact = (tree: unknown): any =>
	hastToHyperscript(
		(name: string, attrs: Record<string, string | null>, children: any) => {
			if (name === 'img') {
				attrs['data-src'] = attrs.src
				attrs.src = ''
				attrs.className = 'lazyload'
			}
			return React.createElement(name, attrs, children)
		},
		tree,
	).props.children
