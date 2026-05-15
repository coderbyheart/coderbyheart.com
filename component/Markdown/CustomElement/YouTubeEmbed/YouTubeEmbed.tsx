export const YouTubeEmbed = (props: { url: URL }) => (
	<iframe
		src={props.url.toString()}
		class={'iframe youtube'}
		loading="lazy"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
)
