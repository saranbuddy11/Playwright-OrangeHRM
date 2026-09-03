import { test, expect } from '../fixtures/appFixtures.js';

const DASHBOARD_API = '**/web/index.php/api/v2/dashboard/employees/action-summary*';

test.describe('Network interception and resilience @regression @integration', () => {
  test('regression: mock and validate dashboard API request', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'high' });
    testInfo.annotations.push({ type: 'category', description: 'regression' });

    let capturedRequest;
    await page.route(DASHBOARD_API, async route => {
      capturedRequest = route.request();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [{ group: 'pendingSelfReview', pendingActionCount: 0 }] })
      });
    });

    await page.goto('/');
    const result = await page.evaluate(async () => {
      const response = await fetch('/web/index.php/api/v2/dashboard/employees/action-summary');
      return { status: response.status, body: await response.json() };
    });

    expect(capturedRequest).toBeTruthy();
    expect(capturedRequest.method()).toBe('GET');
    expect(capturedRequest.url()).toContain('/api/v2/dashboard/employees/action-summary');
    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(1);
  });

  test('integration: simulate API network failure with route.abort', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'high' });
    testInfo.annotations.push({ type: 'category', description: 'integration' });

    await page.route(DASHBOARD_API, route => route.abort('failed'));
    await page.goto('/');

    const result = await page.evaluate(async () => {
      try {
        await fetch('/web/index.php/api/v2/dashboard/employees/action-summary');
        return { failed: false };
      } catch (error) {
        return { failed: true, message: String(error) };
      }
    });

    expect(result.failed).toBe(true);
  });

  test('integration: client handles delayed API timeout', async ({ page }, testInfo) => {
    test.slow();
    testInfo.annotations.push({ type: 'priority', description: 'medium' });
    testInfo.annotations.push({ type: 'category', description: 'integration' });
    testInfo.annotations.push({ type: 'network', description: 'timeout-simulation' });

    await page.route(DASHBOARD_API, async route => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [] })
      });
    });

    await page.goto('/');
    const result = await page.evaluate(async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 250);
      try {
        await fetch('/web/index.php/api/v2/dashboard/employees/action-summary', {
          signal: controller.signal
        });
        return 'completed';
      } catch (error) {
        return error.name;
      } finally {
        clearTimeout(timer);
      }
    });

    expect(result).toBe('AbortError');
  });

  test('known issue: documents a quarantined network scenario', async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'low' });
    testInfo.annotations.push({ type: 'knownIssue', description: 'DEMO-NETWORK-001' });
    test.fixme(true, 'Known issue example retained for assignment annotation coverage.');
  });
});
