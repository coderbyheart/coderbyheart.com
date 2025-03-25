import {
	createEffect,
	createSignal,
	type JSX,
	type ParentProps,
} from 'solid-js'
import { Dynamic, isServer } from 'solid-js/web'
import { MastodonStatus } from './Markdown/CustomElement/MastodonStatus/MastodonStatus.tsx'
import { getChaosEmbedURL } from './Markdown/CustomElement/MastodonStatus/getChaosEmbedURL.ts'

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

export const Markdown = (props: { html: string }) => {
	if (isServer) return <div class={'content'} innerHTML={props.html} />

	const parser = new DOMParser()
	const doc = parser.parseFromString(
		`<article class="content">${props.html}</article>`,
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
			return null
		}

		setRootComponent(renderNode(rootElement) as Node)
	})

	return <div>{rootComponent()}</div>
}
