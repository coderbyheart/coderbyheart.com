/*! Remove outline when user use mouse. Adapted from https://github.com/lindsayevans/outline.js/ */
;(function (d) {
	var style_element = d.createElement('STYLE')
	d.getElementsByTagName('HEAD')[0].appendChild(style_element)
	d.addEventListener('mousedown', function () {
		style_element.innerHTML =
			':focus{outline:0 !important;}::-moz-focus-inner{border:0 !important;}'
	})
	d.addEventListener('keydown', function () {
		style_element.innerHTML = ''
	})
})(document)
