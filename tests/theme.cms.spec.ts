import { expect, test } from '@playwright/test'

const THEME_STORAGE_KEY = 'lps-theme-preference'

test.describe('CMS theme system (public)', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('uses system dark theme on login when device prefers dark', async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.removeItem(key)
      document.cookie = `${key}=; Path=/; Max-Age=0; SameSite=Lax`
    }, THEME_STORAGE_KEY)

    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/login')

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })
})

test.describe('CMS theme system (authenticated)', () => {
  test.use({ storageState: 'tests/.auth/admin.json' })

  test('persists manual theme selection from header and settings', async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.removeItem(key)
      document.cookie = `${key}=; Path=/; Max-Age=0; SameSite=Lax`
    }, THEME_STORAGE_KEY)

    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/dashboard$/)

    const headerToggle = page.getByRole('button', { name: /Tema:/i })
    await expect(headerToggle).toBeVisible()
    await headerToggle.click()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect
      .poll(async () =>
        page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY)
      )
      .toBe('dark')

    await page.goto('/settings')
    await page.getByRole('tab', { name: /appearance/i }).click()
    await page.getByRole('radio', { name: /Claro/i }).click()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect
      .poll(async () =>
        page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY)
      )
      .toBe('light')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })
})
