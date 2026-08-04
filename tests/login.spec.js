import { test } from "../fixtures/appFixtures.js";
import { USERS } from "../config/testConfig.js";

test.describe("OrangeHRM Login Tests", () => {

    test("Verify user can login with valid credentials", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(USERS.admin.username, USERS.admin.password);
        await loginPage.verifyDashboard();
    });

    test("Verify login fails with invalid password", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(USERS.admin.username, "wrong123");
        await loginPage.verifyError("Invalid credentials");
    });

    test("Verify login fails with invalid username", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login("WrongUser", USERS.admin.password);
        await loginPage.verifyError("Invalid credentials");
    });

    test("Verify validation message for empty username", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login("", USERS.admin.password);
        await loginPage.verifyRequiredMessage("Required");
    });

    test("Verify validation message for empty password", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(USERS.admin.username, "");
        await loginPage.verifyRequiredMessage("Required");
    });

    test("Verify validation messages for empty username and password", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login("", "");
        await loginPage.verifyRequiredMessages(2);
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({
                path: `screenshots/${testInfo.title}.png`
            });
        }
    });
});