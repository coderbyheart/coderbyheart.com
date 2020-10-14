const React = require('react')

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
	const headComponents = getHeadComponents()
	replaceHeadComponents([
		...headComponents,
		<meta
			key="version"
			name="version"
			content={process.env.VERSION ?? Date.now()}
		/>,
		<meta key="disqus" name="disqus" content="coderbyheart" />,
	])
}
