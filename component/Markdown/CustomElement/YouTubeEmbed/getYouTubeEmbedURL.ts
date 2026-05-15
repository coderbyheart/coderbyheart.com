export const getYouTubeEmbedURL = (element: Element): URL | null => {
	if (element.tagName !== 'A') return null
	const parent = element.parentElement
	if (parent?.tagName !== 'P') return null
	if ((parent.textContent ?? '').trim() !== (element.textContent ?? '').trim())
		return null
	try {
		const url = new URL(element.getAttribute('href')!)
		const isYouTubeHost =
			url.hostname === 'www.youtube.com' ||
			url.hostname === 'youtube.com' ||
			url.hostname === 'youtu.be'
		if (!isYouTubeHost) return null
		const embedMatch = /^\/embed\/([\w-]+)/.exec(url.pathname)
		if (embedMatch === null) return null
		return new URL(`https://www.youtube.com/embed/${embedMatch[1]}`)
	} catch {
		return null
	}
}
