import { test, expect } from '../fixtures/appFixtures.js';

test.describe('Element visual regression @visual @regression', () => {
  test.beforeEach(async ({ page }) => {
    // A clean browser context is used so the login page remains deterministic
    // even though the main browser projects use authenticated storage state.
    await page.context().clearCookies();
    await page.goto('/web/index.php/auth/login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
  });

  test('visual: login form element snapshot', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'high' });
    testInfo.annotations.push({ type: 'category', description: 'visual' });

    const loginForm = page.locator('.orangehrm-login-form');
    await expect(loginForm).toBeVisible();
    await expect(loginForm).toHaveScreenshot('login-form.png', {
      animations: 'disabled'
    });
  });
});
