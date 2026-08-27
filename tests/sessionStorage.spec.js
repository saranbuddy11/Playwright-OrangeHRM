import { test, expect } from "@playwright/test";
import { saveSessionStorage, readSessionStorage, restoreSessionStorage } from "../utils/sessionStorage.js";
const SESSION_FILE = "auth/sessionStorage.json";

test.describe("Session Storage Management", () => {
    test.beforeAll(async ({ browser }) => {
        console.log("Preparing sessionStorage test data...");
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://opensource-demo.orangehrmlive.com/");
        await page.evaluate(() => {
            sessionStorage.setItem("automationRole", "Admin");
            sessionStorage.setItem("automationFramework", "Playwright");
        });
        await saveSessionStorage(page, SESSION_FILE);
        await context.close();
    });

    test("Verify saved sessionStorage", async () => {
        const sessionData = await readSessionStorage(SESSION_FILE);
        expect(sessionData.automationRole).toBe("Admin");
        expect(sessionData.automationFramework).toBe("Playwright");
    });

    test("Restore sessionStorage in new context", async ({ browser }) => {
        const sessionData = await readSessionStorage(SESSION_FILE);
        const context = await browser.newContext();
        await restoreSessionStorage(context, sessionData);
        const page = await context.newPage();
        await page.goto("https://opensource-demo.orangehrmlive.com/");
        const role = await page.evaluate(() => {
            return sessionStorage.getItem("automationRole");
        });
        const framework = await page.evaluate(() => {
            return sessionStorage.getItem("automationFramework");
        });
        expect(role).toBe("Admin");
        expect(framework).toBe("Playwright");
        await context.close();
    });
});