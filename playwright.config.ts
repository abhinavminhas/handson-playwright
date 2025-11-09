import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

/* Configure viewport to apply to browsers for all tests. */
const viewPortWidth = 1280;
const viewPortHeight = 720;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [ 'html', { open: 'never' } ],
    [ 'junit' , { outputFile: 'playwright-report/junit/results.xml' } ],
    [ 'list' ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Whether to run browser in headless mode. Defaults to true. */
    headless: true,
    /* Capture screenshots */
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    /* Capture videos */
    video: {
      mode: 'retain-on-failure',
      size: { width: viewPortWidth, height: viewPortHeight },
    },
    /* Set default timeout in milliseconds for actions like `click()`, `fill()`, etc. Defaults to 0 (no timeout) */
    actionTimeout: 5 * 1000, // 5 seconds
    /* Set default maximum time  in milliseconds for each navigation operation. Defaults to 30 seconds */
    navigationTimeout: 30 * 1000, // 30 seconds
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: viewPortWidth, height: viewPortHeight } },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: { width: viewPortWidth, height: viewPortHeight } },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport: { width: viewPortWidth, height: viewPortHeight } },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge', viewport: { width: viewPortWidth, height: viewPortHeight } },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: viewPortWidth, height: viewPortHeight }s },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
