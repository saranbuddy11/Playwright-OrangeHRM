import { test, expect } from "../fixtures/appFixtures.js";
import { createEmployee } from "../utils/employeeHelper.js";
import employees from "../test-data/employees.json" with { type: "json" };
import { log } from "../utils/logger.js";

test.describe("PIM Employee", () => {

    test("Create Employee", { tag: "@regression" }, async ({ loggedInPage, pimPage, page }) => {
        let employeeData;
        await test.step("Create Employee", async () => {
            employeeData = await createEmployee(pimPage);
        });

        await test.step("Search Employee", async () => {
            await pimPage.openEmployeeListPage();
            await page.reload();
            await pimPage.openEmployeeListPage();
            await pimPage.searchEmployee(employeeData.id);
            await pimPage.verifyEmployeeFound(employeeData.id);
            await pimPage.clearSearchFields();
            await pimPage.searchByName(employeeData.firstName);
            await pimPage.verifyEmployeeFound(employeeData.id);
            await pimPage.verifyEmployeeName(employeeData.firstName);
        });

        await test.step("Delete Employee", async () => {
            await pimPage.clearSearchFields();
            await pimPage.searchEmployee(employeeData.id);
            await pimPage.verifyEmployeeFound(employeeData.id);
            await expect(pimPage.getEmployeeRow(employeeData.id)).toBeVisible();
            await pimPage.deleteEmployee(employeeData.id);
            await pimPage.confirmDelete();
            await pimPage.verifyDeleteSuccess();
        });

        await test.step("Verify Employee Deleted", async () => {
            await pimPage.clearSearchFields();
            await pimPage.searchEmployee(employeeData.id);
            await pimPage.verifyEmployeeDeleted();
        });
    });

    test("Delete Employee", { tag: "@regression" }, async ({ loggedInPage, pimPage }) => {
        const employee = await createEmployee(pimPage);
        await pimPage.openEmployeeListPage();
        await pimPage.searchEmployee(employee.id);
        await pimPage.deleteEmployee(employee.id);
        await pimPage.confirmDelete();
        await pimPage.verifyDeleteSuccess();
        await pimPage.searchEmployee(employee.id);
        await pimPage.verifyEmployeeDeleted();
    });

    employees.forEach(employee => {
        test(`Create ${employee.firstName}`, async ({ loggedInPage, pimPage }) => {
            const createdEmployee = await createEmployee(pimPage, employee);
            log(`Employee Created:
${createdEmployee.id}
${createdEmployee.firstName}
${createdEmployee.lastName}`
            );
        }
        );
    });
});