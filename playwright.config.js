import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  retries: 1,
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/results.xml' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/',
    headless: process.env.HEADLESS !== "false",
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth/admin.json"
      },
      dependencies: ["setup"]
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "auth/admin.json"
      },
      dependencies: ["setup"]
    }
  ]
});