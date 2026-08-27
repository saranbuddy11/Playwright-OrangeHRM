import { test, expect } from "../fixtures/appFixtures.js";
import { timeoutAfter } from "../utils/promiseUtils.js";

test("Advanced Promise handling - UI action, API synchronization and timeout", async ({ loggedInPage, pimPage, page }) => {
    await pimPage.openPIM();
    const apiResponsePromise = page.waitForResponse(
        response =>
            response.url().includes("/api/v2/pim/employees")
            &&
            response.request().method() === "GET"
    );
    const [response] = await Promise.all([
        Promise.race([apiResponsePromise,
            timeoutAfter(5000, "Employee search API timeout")]),
        pimPage.searchButton.click()
    ]);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2));
});