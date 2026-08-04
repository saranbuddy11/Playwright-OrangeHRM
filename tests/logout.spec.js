import { test, expect } from "../fixtures/appFixtures.js";

test.describe("Logout Tests", () => {

    test("Verify user can logout successfully", async ({ loggedInPage }) => {
        await loggedInPage.logout();
        await loggedInPage.verifyLogout();
    });

    test("Verify session expires after logout", async ({ loggedInPage, page }) => {
        await loggedInPage.logout();
        await page.goto("/web/index.php/dashboard/index");
        await expect(page).toHaveURL(/login/);
    });

    test("Verify browser back button after logout", async ({ loggedInPage, page }) => {
        await loggedInPage.logout();
        await page.goBack();
        await expect(page).toHaveURL(/login/);
    });

    test("Logout should not throw error if clicked once", async ({ loggedInPage }) => {
        await loggedInPage.logout();
        await loggedInPage.verifyLogout();
    });
});