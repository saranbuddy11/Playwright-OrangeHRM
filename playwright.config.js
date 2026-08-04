import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

dotenv.config();
export default defineConfig({

  testDir: './tests',

  timeout: 30000,

  fullyParallel: true,

  retries: 1,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {

    baseURL: process.env.BASE_URL,

    headless: false,

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 10000,

    navigationTimeout: 30000
  },

  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }

  ]

});