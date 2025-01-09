export const getChaosEmbedURL = (element: Element): URL | null => {
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
