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

	loadScriptAsync(
		'https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js',
	).then(() => {
		window.onscroll = _.debounce(setScroll, 250)
	})
})()
