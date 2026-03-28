import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Suritargets/)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('about page loads', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/Over ons/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('services page loads', async ({ page }) => {
    await page.goto('/services')
    await expect(page).toHaveTitle(/Diensten/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact')
    await expect(page).toHaveTitle(/Contact/)
    await expect(page.locator('form')).toBeVisible()
  })

  test('404 page shows custom not-found', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.locator('text=404')).toBeVisible()
    await expect(page.locator('text=Pagina niet gevonden')).toBeVisible()
  })

  test('case-studies coming soon page loads', async ({ page }) => {
    await page.goto('/case-studies')
    await expect(page.locator('text=Coming Soon')).toBeVisible()
  })

  test('insights coming soon page loads', async ({ page }) => {
    await page.goto('/insights')
    await expect(page.locator('text=Coming Soon')).toBeVisible()
  })
})

test.describe('Services detail pages', () => {
  const slugs = ['business-support', 'web-applications', 'research', 'forensics', 'education']

  for (const slug of slugs) {
    test(`/services/${slug} loads`, async ({ page }) => {
      await page.goto(`/services/${slug}`)
      await expect(page.locator('h1')).toBeVisible()
      // breadcrumb
      await expect(page.locator('nav[aria-label="breadcrumb"], [aria-current="page"]')).toBeVisible()
    })
  }

  test('invalid service slug shows 404', async ({ page }) => {
    await page.goto('/services/nonexistent-service')
    await expect(page.locator('text=404')).toBeVisible()
  })
})

test.describe('Nav links', () => {
  test('nav links are present on home', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('header nav')
    await expect(nav.locator('a[href="/about"]')).toBeVisible()
    await expect(nav.locator('a[href="/contact"]')).toBeVisible()
  })

  test('logo links back to home', async ({ page }) => {
    await page.goto('/about')
    await page.locator('header a[href="/"]').click()
    await expect(page).toHaveURL('/')
  })
})
