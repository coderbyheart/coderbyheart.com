import vikeSolid from 'vike-solid/config'
import type { Config } from 'vike/types'
import { Layout } from '../layout/Layout.tsx'
import { name, tagLine } from './info.ts'

export const config = {
	// https://vike.dev/Layout
	Layout,
	// https://vike.dev/extends
	extends: vikeSolid,
	// Default <title>
	title: `${name} · ${tagLine}`,
	// Default <meta name="description">
	description:
		'Software Crafter building 🌩️ cloud-based cellular IoT solutions at Nordic Semiconductor.​ Mentor. Speaker. ​Conference & Community builder. Camper. 🏕️ 🚐',
	prerender: true,
} as const satisfies Config
