import vikeSolid from 'vike-solid/vite'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'
import { homepage, version } from './siteInfo.ts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vike({
			prerender: true,
		}),
		vikeSolid(),
	],
	build: {
		sourcemap: true,
	},
	resolve: {
		alias: [
			{ find: '#content/', replacement: '/content/' },
			{ find: '#component/', replacement: '/component/' },
			{ find: '#layout/', replacement: '/layout/' },
			{ find: '#pages/', replacement: '/pages/' },
			{ find: '#util/', replacement: '/util/' },
		],
	},
	define: {
		HOMEPAGE: JSON.stringify(homepage),
		VERSION: JSON.stringify(version),
		BUILD_TIME: JSON.stringify(new Date().toISOString()),
	},
})
