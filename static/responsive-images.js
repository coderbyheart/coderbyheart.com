;((document) => {
	const step = (n) => Math.floor(n / 50) * 50

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
		const imgWidth = Math.min(window.innerWidth, width)
		const imgHeight = imgWidth * parseFloat(ratio)
		e.target.setAttribute('height', imgHeight.toString())
		params.set('w', step(imgWidth))
		params.set('h', step(imgHeight))
		params.set('fm', 'webp')
		params.set('fit', 'thumb')
		e.target.setAttribute(
			'data-src',
			[e.target.getAttribute('data-src').split('?')[0], params.toString()].join(
				'?',
			),
		)
	})
})(document)
