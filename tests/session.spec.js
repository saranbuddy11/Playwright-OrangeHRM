import { test, expect } from "../fixtures/appFixtures.js";

test("Verify cookies after login", async ({ loggedInPage, page }) => {
    const cookies = await page.context().cookies();
    console.log("Cookies:", cookies);
    expect(cookies.length).toBeGreaterThan(0);
});

test("Add and verify custom cookie", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.context().addCookies([
        {
            name: "automationTest",
            value: "playwright",
            domain: "opensource-demo.orangehrmlive.com",
            path: "/"
        }
    ]);
    const cookies = await page.context().cookies();
    const customCookie = cookies.find(cookie => cookie.name === "automationTest");
    console.log("Custom Cookies:", customCookie);
    expect(customCookie).toBeDefined();
    expect(customCookie.value).toBe("playwright");
});

test("Clear cookies and verify", { tag: "@practice" }, async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.context().clearCookies();
    const cookies = await page.context().cookies();
    expect(cookies).toHaveLength(0);
});

test("Set and read session storage", { tag: "@sessionStorage" }, async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.evaluate(() => { sessionStorage.setItem("testRole", "Admin"); });
    const role = await page.evaluate(() => { return sessionStorage.getItem("testRole"); });
    console.log("Customised Session Storage:", role);
    expect(role).toBe("Admin");
});

test("Read complete session storage", { tag: "@readSessionStorage" }, async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    const data = await page.evaluate(() => { return Object.fromEntries(Object.entries(sessionStorage)); });
    console.log("Session Storage:", data);
});