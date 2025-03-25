import favicon from './favicon.ico'

export const Head = () => (
	<>
		<link rel="icon" href={favicon} />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
		<link
			href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
			rel="stylesheet"
		/>
		<link rel="stylesheet" href="./reset.css" />
		<link rel="stylesheet" href="./Layout.css" />
		<link rel="stylesheet" href="./Markdown.css" />
		<link rel="stylesheet" href="./Footer.css" />
		<link rel="stylesheet" href="./Me.css" />
		<link rel="stylesheet" href="./MainNav.css" />
		<link rel="stylesheet" href="./MetaNav.css" />
		<link rel="stylesheet" href="./Hero.css" />
		<link rel="stylesheet" href="./Title.css" />
		<link rel="stylesheet" href="./Main.css" />
		<link rel="stylesheet" href="./Start.css" />
		<link rel="stylesheet" href="./Talks.css" />
		<link rel="stylesheet" href="./MastodonStatus.css" />
	</>
)
