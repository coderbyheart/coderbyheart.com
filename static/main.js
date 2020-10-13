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

	loadScriptAsync(
		'https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js',
	).then(() => {
		window.onscroll = _.debounce(setScroll, 250)
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

	// Responsive images
	Promise.all([
		loadScriptAsync('https://afarkas.github.io/lazysizes/lazysizes.min.js'),
		loadScriptAsync(
			'https://afarkas.github.io/lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js',
		),
	]).then(() => {
		const step = (n) => Math.floor(n / 50) * 50

		window.lazySizesConfig = window.lazySizesConfig || {}
		window.lazySizesConfig.expand = 50
		window.lazySizesConfig.expandFactor = 4

		document.addEventListener('lazybeforeunveil', (e) => {
			if (!e.target.getAttribute('class').includes('responsive')) return
			const [width, height] = [
				e.target.getAttribute('width'),
				e.target.getAttribute('height'),
			].map((s) => parseInt(s, 10))
			if (isNaN(width) || isNaN(height)) return
			const ratio = e.target.getAttribute('data-aspectratio')
			const params = new URLSearchParams()
			// Assumes all images to be full-screen width
			const imgWidth = Math.min(Math.max(window.innerWidth, 1000), width)
			const imgHeight = imgWidth * parseFloat(ratio)
			params.set('w', step(imgWidth))
			params.set('h', step(imgHeight))
			params.set('fm', 'webp')
			params.set('fit', 'thumb')
			e.target.setAttribute(
				'data-src',
				[
					e.target
						.getAttribute('data-src')
						.split('?')[0]
						.replace(/^\/\//, 'https://'),
					params.toString(),
				].join('?'),
			)
		})
	})
})(document)
