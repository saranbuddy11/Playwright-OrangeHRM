import { test, expect } from "@playwright/test";

test("Mock API response using fulfill", async ({ page }) => {
    await page.route("**/users/1", async route => {
        await route.fulfill({
            status: 200, contentType:
                "application/json",
            body: JSON.stringify({
                id: 1,
                name: "Mocked Playwright User",
                role: "Automation Engineer"
            })
        });
    });
    const response = await page.request.get("https://jsonplaceholder.typicode.com/users/1");
    const body = await response.json();
    console.log(body);
});