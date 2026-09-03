import { test, expect } from '../fixtures/appFixtures.js';

const shouldRun = process.env.ENVIRONMENT !== 'prod';

test.describe('OrangeHRM advanced assignment suite @smoke @regression', { tag: '@smoke' }, () => {
  test.beforeEach(async ({ page }) => {
    // Establish a predictable starting page without assuming auth/login state.
    await page.goto('/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title.replace(/\s+/g, '-')}.png`, fullPage: true });
    }
  });

  test('smoke: login form loads with authenticated fixture', async ({ authenticatedUser, page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'high' });
    testInfo.annotations.push({ type: 'category', description: 'smoke' });
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('regression: network interception for dashboard API', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'high' });
    testInfo.annotations.push({ type: 'category', description: 'regression' });
    let intercepted = false;
    const apiPattern = '**/web/index.php/api/v2/dashboard/employees/action-summary*';

    await page.route(apiPattern, async route => {
      intercepted = true;
      expect(route.request().method()).toBe('GET');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [], meta: { mocked: true } })
      });
    });

    await page.evaluate(async () => {
      await fetch('/web/index.php/api/v2/dashboard/employees/action-summary');
    });
    await expect.poll(() => intercepted).toBe(true);
  });

  test('integration: offline scenario handling', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'medium' });
    testInfo.annotations.push({ type: 'category', description: 'integration' });
    test.skip(shouldRun === false, 'Skipping integration test in prod environment');
    await page.context().setOffline(true);
    const error = await page.goto('https://example.com', { waitUntil: 'domcontentloaded', timeout: 5000 }).catch(err => err);
    expect(error).toBeTruthy();
    expect(String(error)).toContain('ERR_INTERNET_DISCONNECTED');
  });

  test('visual: login page snapshot', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'high' });
    testInfo.annotations.push({ type: 'category', description: 'visual' });
    await page.context().clearCookies();
    await page.goto('/web/index.php/auth/login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page).toHaveScreenshot('login-page.png', { animations: 'disabled' });
  });

  test('accessibility: aria snapshot', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'medium' });
    testInfo.annotations.push({ type: 'category', description: 'accessibility' });
    await page.context().clearCookies();
    await page.goto('/web/index.php/auth/login');
    await expect(page.locator('body')).toMatchAriaSnapshot(`- textbox "Username"`);
  });
});
