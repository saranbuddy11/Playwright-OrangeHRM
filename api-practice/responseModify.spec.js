import { test, expect } from "@playwright/test";

test("Fetch real response and modify JSON", async ({ page }) => {
    await page.route("**/users/1", async route => {
        const response = await route.fetch();
        const json = await response.json();
        console.log("Original:", json.name);
        json.name = "Modified By Playwright";
        await route.fulfill({ response, json });
    });
    await page.goto("https://jsonplaceholder.typicode.com/");
    const result = await page.evaluate(async () => {
        const response = await fetch("/users/1");
        return response.json();
    });
    console.log("Modified response:", result);
    expect(result.name).toBe("Modified By Playwright");
});