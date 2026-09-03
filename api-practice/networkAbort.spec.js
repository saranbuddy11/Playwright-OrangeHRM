import { test, expect } from "@playwright/test";

test("Abort network request", async ({ page }) => {
    await page.route("**/users/1", async route => {
        await route.abort();
    });
    await page.goto("https://jsonplaceholder.typicode.com/");
    const result = await page.evaluate(async () => {
        try {
            await fetch("/users/1");
            return "SUCCESS";
        } catch {
            return "NETWORK_ERROR";
        }
    });
    console.log(result);
    expect(result).toBe("NETWORK_ERROR");
});