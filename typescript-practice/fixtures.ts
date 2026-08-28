import { test as base, expect } from "@playwright/test";
import { LoginPageTS } from "./LoginPageTS.ts";
type MyFixtures = {
    loginPage: LoginPageTS;
};
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPageTS(page);
        await use(loginPage);
    }
});

export { expect };