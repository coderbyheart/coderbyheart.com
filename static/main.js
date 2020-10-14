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
			const maxSize = Math.min(window.innerWidth, width) // Do not upscale images
			const imgWidth = Math.min(Math.max(maxSize, 1000), width)
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
			if (maxSize == window.innerWidth) {
				e.target.setAttribute('data-large-source', '1')
			}
		})
	})

	// Disqus
	const canonicalUrl = document.head.querySelector("link[rel='canonical']").href
	const disqusId = document.head.querySelector("meta[name='disqus']").content
	let hasDisqus = false
	let disqusInited = false
	const disqusThread = document.getElementById('disqus_thread')
	if (disqusId && disqusThread) {
		hasDisqus = true
		window.disqus_config = function () {
			this.page.url = canonicalUrl
			this.page.identifier = new URL(canonicalUrl).pathname.substr(1)
		}
	}
	/**
	 * @param {object} el
	 * @returns {boolean}
	 */
	const shouldBeShown = (el) => {
		const rect = el.getBoundingClientRect()

		if (rect.top < 0) return true // user has scrolled over it, load it anyway
		if (
			rect.top <
			window.scrollY +
				(window.innerHeight || document.documentElement.clientHeight)
		)
			return true // top of element is in viewport
		return false
	}

	const loadDisqus = () => {
		console.log('loading disqus')
		console.log({
			hasDisqus,
			disqusInited,
			shouldBeShown: shouldBeShown(disqusThread),
		})
		if (hasDisqus && !disqusInited && shouldBeShown(disqusThread)) {
			disqusInited = true
			const s = document.createElement('script')
			s.src = `//${disqusId}.disqus.com/embed.js`
			s.setAttribute('data-timestamp', +new Date())
			document.body.appendChild(s)
		}
	}
	_load.then(() => {
		loadDisqus()
	})

	_load.then(() => {
		window.addEventListener('scroll', _.debounce(loadDisqus, 250))
	})
})(document)
