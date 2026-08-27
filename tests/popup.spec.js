import { test, expect } from "@playwright/test";
import { waitForNewPage } from "../utils/pageUtils.js";

test("Handle new tab using Promise.all", async ({ page }) => {
    await page.setContent(`
            <html>
                <body>
                    <a
                        id="openPopup"
                        href="https://example.com"
                        target="_blank"
                    >
                        Open New Window
                    </a>
                </body>
            </html>
        `);
    const popup = await waitForNewPage(page, () =>
        page.locator("#openPopup").click());
    await expect(popup).toHaveURL(/example.com/);
    console.log(`Popup URL: ${popup.url()}`);
    console.log(`Popup Title: ${await popup.title()}`);
});