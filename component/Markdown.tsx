import {
	createEffect,
	createSignal,
	type JSX,
	type ParentProps,
} from 'solid-js'
import { Dynamic, isServer } from 'solid-js/web'
import styles from './Markdown.module.css'
import { MastodonStatus } from './Markdown/CustomElement/MastodonStatus.tsx'

const genericComponent = (element: Element) => {
	const attributesMap: { [key: string]: string } = {}
	for (const attr of element.attributes) {
		attributesMap[attr.name] = attr.value
	}
	return (props: ParentProps) => (
		<Dynamic component={element.tagName.toLowerCase()} {...attributesMap}>
			{props.children}
		</Dynamic>
	)
}

const elementToComponent = (
	element: Element,
): null | ((props: ParentProps) => JSX.Element) => {
	const maybeChaosEmbedURL = getChaosEmbedURL(element)
	if (maybeChaosEmbedURL !== null)
		return () => <MastodonStatus url={maybeChaosEmbedURL} />
	return genericComponent(element)
}

const getChaosEmbedURL = (element: Element): URL | null => {
	try {
		const url = new URL(element.getAttribute('href')!)
		return url.hostname.includes('chaos.social') &&
			url.pathname.endsWith('/embed')
			? url
			: null
	} catch {
		return null
	}
}

export const Markdown = (props: { html: string }) => {
	if (isServer) return <div class={styles.content} innerHTML={props.html} />

	const parser = new DOMParser()
	const doc = parser.parseFromString(
		`<article>${props.html}</article>`,
		'text/html',
	)
	const [rootComponent, setRootComponent] = createSignal<Node | null>(null)

	createEffect(() => {
		const rootElement = doc.body.firstChild as Node
		const renderNode = (node: Node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const Component = elementToComponent(node as Element)

				if (Component !== null) {
					return (
						<Component>{Array.from(node.childNodes).map(renderNode)}</Component>
					)
				}
			} else if (node.nodeType === Node.TEXT_NODE) {
				return node.textContent
			}
			console.error('Unknown node type', node)
			return null
		}

		setRootComponent(renderNode(rootElement) as Node)
	})

	return <div>{rootComponent()}</div>
}
