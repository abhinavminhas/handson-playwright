import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  await expect(page.locator('header.hero')).toHaveScreenshot('playwright-home-header.png', {
    mask: [
      page.locator('a.gh-count')
    ],
  });
});