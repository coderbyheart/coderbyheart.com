const fs = require('node:fs')

exports.loadNodeContent = ({ absolutePath }) =>
	fs.readFile(absolutePath, `utf-8`)
