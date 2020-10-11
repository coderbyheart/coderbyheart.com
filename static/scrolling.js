const setClass = (el, classes) => {
	const elClasses = {
		...el.className
			.split(' ')
			.reduce((elClasses, c) => ({ ...elClasses, [c]: true }), {}),
		...classes,
	}
	el.className = Object.entries(elClasses)
		.filter(([k, v]) => v)
		.map(([k]) => k)
		.join(' ')
		.trim()
}

const setScroll = () =>
	setClass(document.body, { scrolling: window.scrollY > 0 })

window.onscroll = _.debounce(setScroll, 250)

window.setTimeout(setScroll, 250)
