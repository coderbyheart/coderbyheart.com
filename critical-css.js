/**
 * This script extracts the critical CSS and adds it as the only style tag in
 * the index.html's head. Other style tags in the head are converted to
 * asynchronously loaded styles.
 */

const minimalcss = require('minimalcss')
const path = require('path')
const fs = require('fs')
const JSDOM = require('jsdom').JSDOM
const crypto = require('crypto')
const static = require('node-static')
const http = require('http')

const servePublic = new static.Server(path.join(process.cwd(), 'public'))
const port = 8666
const server = http
	.createServer((request, response) => {
		request
			.addListener('end', () => servePublic.serve(request, response))
			.resume()
	})
	.listen(port)

const id = () =>
	crypto
		.randomBytes(Math.ceil(8 * 0.5))
		.toString('hex')
		.slice(0, 8)

console.error('Extracting critical styles:')

minimalcss
	.minimize({
		url: `http://localhost:${port}/`,
		skippable: (request) => {
			return !!request.url().match('fonts.googleapis.com')
		},
		viewport: {
			width: 1300,
			height: 900,
		},
		styletags: true,
		cssoOptions: {
			comments: false,
		},
		disableJavaScript: true,
	})
	.then(async ({ finalCss }) => {
		server.close()
		const indexFile = path.join(process.cwd(), 'public', `index.html`)
		const index = fs.readFileSync(indexFile, 'utf-8')
		const originalSize = fs.statSync(indexFile).size

		const jsdom = new JSDOM(index)
		const { window } = jsdom
		const head = window.document.getElementsByTagName('head')[0]
		const body = window.document.getElementsByTagName('body')[0]

		// Convert existing style tags to be loaded asynchronously

		const extracted = []

		head.childNodes.forEach(async (el) => {
			if (el.tagName !== 'STYLE') return
			// Save CSS to a file
			const styleFile = `extracted-${id()}.css`
			const styleLocation = path.join(process.cwd(), 'public', styleFile)
			fs.writeFileSync(styleLocation, el.textContent)
			console.error(
				'-',
				`${styleFile} written:`,
				`${fs.statSync(styleLocation).size} byte`,
			)
			extracted.push(styleFile)
			// Remove style tag
			el.remove()
		})

		// Add extracted using JS calls so they load asynchronously
		const script = window.document.createElement('script')
		script.type = 'text/javascript'
		script.defer = true
		script.innerHTML =
			`const loadAsync = (src) =>
				((d) => {
					var x = d.createElement('link')
					var y = d.getElementsByTagName('script')[0]
					x.rel = 'stylesheet'
					x.href = src
					y.parentNode.insertBefore(x, y)
				})(document)
			;` + extracted.map((s) => `loadAsync('./${s}');`).join('\n')
		body.appendChild(script)

		// Add critical CSS as style element
		const critical = window.document.createElement('style')
		critical.type = 'text/css'
		critical.innerHTML = `/* Critical CSS */ ${finalCss}`
		head.appendChild(critical)

		const updatedIndex = jsdom.serialize()
		fs.writeFileSync(indexFile, updatedIndex)
		console.error(
			'-',
			`index.html written:`,
			`${fs.statSync(indexFile).size - originalSize} bytes`,
		)
		console.log('Done extracting critical styles.')
	})
