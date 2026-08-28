import { test } from "./fixtures.ts";

test("Typed fixture login", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("Admin", "admin123");
    await loginPage.verifyDashboard();
});