import { test, expect } from '@playwright/test'

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('form is visible with all required fields', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('input[name="naam"], input[id="naam"]')).toBeVisible()
    await expect(page.locator('input[name="bedrijfsnaam"], input[id="bedrijfsnaam"]')).toBeVisible()
    await expect(page.locator('input[name="email"], input[id="email"]')).toBeVisible()
    await expect(page.locator('textarea[name="bericht"], textarea[id="bericht"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.locator('button[type="submit"]').click()
    // Should show client-side or server-side errors
    // Either HTML5 validation prevents submit, or error messages appear
    const errors = page.locator('[role="alert"]')
    const html5Invalid = page.locator(':invalid')
    const hasErrors = await errors.count() > 0
    const hasHtml5 = await html5Invalid.count() > 0
    expect(hasErrors || hasHtml5).toBe(true)
  })

  test('submit button shows loading state', async ({ page }) => {
    // Mock the API to delay response
    await page.route('/api/contact', async (route) => {
      await new Promise((r) => setTimeout(r, 500))
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
    })

    await page.locator('input[name="naam"], input[id="naam"]').fill('Test Gebruiker')
    await page.locator('input[name="bedrijfsnaam"], input[id="bedrijfsnaam"]').fill('Test Bedrijf')
    await page.locator('input[name="email"], input[id="email"]').fill('test@example.com')
    // Select a service option (required field)
    await page.locator('select[name="service"], [name="service"]').first().selectOption('web-applications')
    await page.locator('textarea[name="bericht"], textarea[id="bericht"]').fill('Dit is een testbericht met voldoende tekst.')
    await page.locator('button[type="submit"]').click()

    await expect(page.locator('button[type="submit"]')).toBeDisabled()
  })

  test('shows success message after valid submission', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
    )

    await page.locator('input[name="naam"], input[id="naam"]').fill('Test Gebruiker')
    await page.locator('input[name="bedrijfsnaam"], input[id="bedrijfsnaam"]').fill('Test Bedrijf')
    await page.locator('input[name="email"], input[id="email"]').fill('test@example.com')
    await page.locator('select[name="service"], [name="service"]').first().selectOption('web-applications')
    await page.locator('textarea[name="bericht"], textarea[id="bericht"]').fill('Dit is een testbericht met voldoende tekst.')
    await page.locator('button[type="submit"]').click()

    await expect(page.locator('text=ontvangen')).toBeVisible({ timeout: 5000 })
  })

  test('shows error message on API failure', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'Internal server error' }) })
    )

    await page.locator('input[name="naam"], input[id="naam"]').fill('Test Gebruiker')
    await page.locator('input[name="bedrijfsnaam"], input[id="bedrijfsnaam"]').fill('Test Bedrijf')
    await page.locator('input[name="email"], input[id="email"]').fill('test@example.com')
    await page.locator('select[name="service"], [name="service"]').first().selectOption('web-applications')
    await page.locator('textarea[name="bericht"], textarea[id="bericht"]').fill('Dit is een testbericht met voldoende tekst.')
    await page.locator('button[type="submit"]').click()

    await expect(page.locator('text=fout, text=mis')).toBeVisible({ timeout: 5000 })
  })
})
