import favicon from './favicon.ico'

const base = import.meta.env.BASE_URL
const asset = (file: string) => `${base.replace(/\/$/, '')}/${file}`

export const Head = () => (
	<>
		<link rel="icon" href={favicon} />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
		<link
			href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
			rel="stylesheet"
		/>
		<link rel="stylesheet" href={asset('reset.css')} />
		<link rel="stylesheet" href={asset('Layout.css')} />
		<link rel="stylesheet" href={asset('Markdown.css')} />
		<link rel="stylesheet" href={asset('Footer.css')} />
		<link rel="stylesheet" href={asset('Me.css')} />
		<link rel="stylesheet" href={asset('MainNav.css')} />
		<link rel="stylesheet" href={asset('MetaNav.css')} />
		<link rel="stylesheet" href={asset('Hero.css')} />
		<link rel="stylesheet" href={asset('Title.css')} />
		<link rel="stylesheet" href={asset('Main.css')} />
		<link rel="stylesheet" href={asset('Start.css')} />
		<link rel="stylesheet" href={asset('Talks.css')} />
		<link rel="stylesheet" href={asset('MastodonStatus.css')} />
		<meta name="build-time" content={BUILD_TIME} />
		<meta name="version" content={VERSION} />
	</>
)
