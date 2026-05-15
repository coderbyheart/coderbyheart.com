import { expect, test } from '@playwright/test'

test('start page can be opened', async ({ page }) => {
	const consoleErrors: string[] = []
	page.on('console', (message) => {
		if (message.type() === 'error') consoleErrors.push(message.text())
	})
	page.on('pageerror', (error) => {
		consoleErrors.push(error.message)
	})

	const response = await page.goto('/')
	expect(response?.ok()).toBe(true)
	await expect(page).toHaveTitle(/Markus Tacker/)

	expect(consoleErrors).toEqual([])
})
