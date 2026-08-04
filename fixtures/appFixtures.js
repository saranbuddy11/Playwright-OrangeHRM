import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { PIMPage } from "../pages/PIMPage.js";
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

    loggedInPage: async ({ page }, use) => {
        await loginPage.goto();
        await loginPage.login(
            USERS.admin.username,
            USERS.admin.password
        );
        await loginPage.verifyDashboard();
        await use(loginPage);
    }
});

export { expect };