import { defineConfig, devices } from '@playwright/test'

const port = 4173
const host = '127.0.0.1'
const isCI = process.env.CI !== undefined

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	reporter: 'list',
	use: {
		baseURL: `http://${host}:${port}`,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: `npx vike preview --host ${host} --port ${port}`,
		url: `http://${host}:${port}/`,
		reuseExistingServer: !isCI,
		stdout: 'pipe',
		stderr: 'pipe',
	},
})
