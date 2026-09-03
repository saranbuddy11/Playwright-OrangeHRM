import { test, expect } from "@playwright/test";

test("Validate API triggered by UI", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    const responsePromise = page.waitForResponse(response =>
        response.url().includes("/api/") && response.status() === 200);
    await page.getByRole("button", { name: "Login" }).click();
    const response = await responsePromise;
    console.log("Captured API:", response.url());
    console.log("Status:", response.status());
    expect(response.status()).toBe(200);
});