import { test, expect } from '@playwright/test'

test('homepage details', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Game Search | VGR')
})
