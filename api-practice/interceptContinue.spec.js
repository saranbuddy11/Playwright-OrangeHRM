import { test } from "@playwright/test";

test("Intercept request and continue to real server", async ({ page }) => {
    await page.route("**/*", async route => {
        const request = route.request();
        if (request.resourceType() === "xhr" || request.resourceType() === "fetch") {
            console.log("API URL:", request.url());
            console.log("Method:", request.method());
        }
        await route.continue();
    });
    await page.goto("https://opensource-demo.orangehrmlive.com/");
});

test("Modify request headers before continue", async ({ page }) => {
    await page.route("**/api/**", async route => {
        const request = route.request();
        const headers = { ...request.headers(), "x-test-framework": "playwright" };
        await route.continue({ headers });
    });
    await page.goto("https://opensource-demo.orangehrmlive.com/");
});