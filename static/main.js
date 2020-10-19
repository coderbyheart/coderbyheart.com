;(() => {
	const loadScriptAsync = (uri) =>
		new Promise((resolve) => {
			const tag = document.createElement('script')
			tag.src = uri
			tag.async = true
			tag.onload = () => {
				resolve()
			}
			const firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
		})

	// Meta Nav
	const setClass = (el, classes) => {
		const elClasses = {
			...el.className
				.split(' ')
				.reduce((elClasses, c) => ({ ...elClasses, [c]: true }), {}),
			...classes,
		}
		el.className = Object.entries(elClasses)
			.filter(([, v]) => v)
			.map(([k]) => k)
			.join(' ')
			.trim()
	}

	const setScroll = () =>
		setClass(document.body, { scrolling: window.scrollY > 0 })

	window.setTimeout(setScroll, 250)

	const _load = loadScriptAsync(
		'https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js',
	)
	_load.then(() => {
		window.addEventListener('scroll', _.debounce(setScroll, 250))
	})

	// Remove outline when user use mouse. Adapted from https://github.com/lindsayevans/outline.js/ */
	var style_element = document.createElement('STYLE')
	document.getElementsByTagName('HEAD')[0].appendChild(style_element)
	document.addEventListener('mousedown', function () {
		style_element.innerHTML =
			':focus{outline:0 !important;}::-moz-focus-inner{border:0 !important;}'
	})
	document.addEventListener('keydown', function () {
		style_element.innerHTML = ''
	})
})(document)
