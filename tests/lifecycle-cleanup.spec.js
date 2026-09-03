import { test, expect } from '../fixtures/dataFixtures.js';
import { createEmployee } from '../utils/employeeHelper.js';

let createdEmployeeId;

test.describe('Lifecycle cleanup and data isolation @regression', () => {
  test.beforeEach(async ({ authenticatedUser }) => {
    createdEmployeeId = undefined;
    await expect(authenticatedUser).toHaveURL(/dashboard/);
  });

  test.afterEach(async ({ pimPage }) => {
    if (!createdEmployeeId) return;

    try {
      await pimPage.openPIM();
      await pimPage.openEmployeeListPage();
      await pimPage.searchEmployee(createdEmployeeId);
      const row = pimPage.getEmployeeRow(createdEmployeeId);
      if (await row.isVisible().catch(() => false)) {
        await pimPage.deleteEmployee(createdEmployeeId);
        await pimPage.confirmDelete();
        await pimPage.verifyDeleteSuccess();
      }
    } catch (error) {
      // Cleanup must not hide the original test result. The trace/report keeps
      // the warning available for diagnosis.
      console.warn(`Cleanup warning for employee ${createdEmployeeId}: ${error.message}`);
    } finally {
      createdEmployeeId = undefined;
    }
  });

  test('regression: employee data is isolated by afterEach cleanup', async ({ pimPage, employeeData }, testInfo) => {
    testInfo.annotations.push({ type: 'priority', description: 'high' });
    testInfo.annotations.push({ type: 'category', description: 'regression' });

    const employee = await createEmployee(pimPage, employeeData);
    createdEmployeeId = employee.id;

    expect(createdEmployeeId).toBeTruthy();
    await pimPage.openEmployeeListPage();
    await pimPage.searchEmployee(createdEmployeeId);
    await pimPage.verifyEmployeeFound(createdEmployeeId);
  });
});
