import { test, expect } from '@playwright/test';

test.describe('Visual Tests', { tag: '@visual' }, () => {
  test('has home header', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.locator('header.hero')).toHaveScreenshot('playwright-home-header.png', {
      mask: [
        page.locator('a.gh-count')
      ],
    });
  });
});
