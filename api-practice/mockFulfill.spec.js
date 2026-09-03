import { test, expect } from "@playwright/test";

test("Mock API response using fulfill", async ({ page }) => {
    await page.route("**/users/1", async route => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
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

test("Mock browser API using route.fulfill", async ({ page }) => {
    await page.route("**/users/1", async route => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                id: 1,
                name: "Mocked Playwright User"
            })
        });
    });
    await page.goto("https://jsonplaceholder.typicode.com/");
    const result = await page.evaluate(async () => {
        const response = await fetch("/users/1");
        return response.json();
    });
    console.log(result);
    expect(result.name).toBe("Mocked Playwright User");
});

test("Mock server error 500", async ({ page }) => {
    await page.route("**/users/1", async route => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ error: "Internal Server Error" })
        });
    });
    await page.goto("https://jsonplaceholder.typicode.com/");
    const result = await page.evaluate(async () => {
        const response = await fetch("/users/1");
        return {
            status: response.status,
            body: await response.json()
        };
    });
    console.log(result);
    expect(result.status).toBe(500);
    expect(result.body.error).toBe("Internal Server Error");
});

test("Mock unauthorized response", async ({ page }) => {
    await page.route("**/users/1", async route => {
        await route.fulfill({
            status: 401,
            contentType: "application/json",
            body: JSON.stringify({
                message: "Unauthorized"
            })
        });
    });
    await page.goto("https://jsonplaceholder.typicode.com/");
    const status = await page.evaluate(async () => {
        const response = await fetch("/users/1");
        return response.status;
    });
    expect(status).toBe(401);
});