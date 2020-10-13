import React from 'react'
import * as hastToHyperscript from 'hast-to-hyperscript'

export const renderHtmlAstToReact = (tree: unknown): any =>
	hastToHyperscript(
		(name: string, attrs: Record<string, string | null>, children: any) => {
			if (name === 'img' && attrs.src !== null) {
				const params = new URLSearchParams(attrs.src.split('?')[1])
				attrs['data-src'] = attrs.src
				attrs.src = ''
				attrs.className = 'lazyload'
				const [w, h] = [params.get('w'), params.get('h')].map((s) =>
					parseInt(s ?? '0', 10),
				)
				if (w > 0 && h > 0) {
					attrs['data-aspectratio'] = (h / w).toFixed(3)
					attrs.width = w.toString()
					attrs.height = h.toString()
				}
			}
			return React.createElement(name, attrs, children)
		},
		tree,
	).props.children
