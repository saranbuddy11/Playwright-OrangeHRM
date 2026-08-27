import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { PIMPage } from "../pages/PIMPage.js";
import { HeaderComponent } from "../components/HeaderComponent.js";
import { USERS } from "../config/testConfig.js";

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    pimPage: async ({ page }, use) => {
        const pimPage = new PIMPage(page);
        await use(pimPage);
    },

    headerComponent: async ({ page }, use) => {
        await use(new HeaderComponent(page));
    },

    authenticatedUser: async ({ page }, use) => {
        await page.goto("/web/index.php/dashboard/index");
        await expect(page).toHaveURL(/dashboard/);
        await use(page);
    },

    loggedInPage: async ({ authenticatedUser }, use) => {
        await use(authenticatedUser);
    }
});

export { expect };