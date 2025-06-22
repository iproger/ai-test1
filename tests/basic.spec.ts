import { test, expect } from '@playwright/test'

const version = process.env.VITE_APP_VERSION

test('homepage shows version', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=v' + version)).toBeVisible()
})

