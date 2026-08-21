import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { HeaderComponent } from "../components/HeaderComponent.js";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new HeaderComponent(page);

        this.username = page.locator("input[name='username']");

        this.password = page.locator("input[name='password']");

        this.loginButton = page.locator("button[type='submit']");

        this.errorMessage = page.locator(".oxd-alert-content-text");

        this.profileMenu = page.locator(".oxd-userdropdown-name");

        this.requiredMessage = page.locator(".oxd-input-field-error-message");

        this.logoutButton = page.getByRole("menuitem", { name: "Logout" });
    }

    async goto() {
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
        await this.username.waitFor({ state: "visible" });
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyDashboard() {
        await expect(this.page).toHaveURL(/dashboard/);
    }

    async verifyError(message) {
        await expect(this.errorMessage)
            .toContainText(message);
    }

    async verifyRequiredMessage(message) {
        await expect(this.requiredMessage
            .first()).toHaveText(message);
    }

    async logout() {
        await this.profileMenu.click();
        await this.logoutButton.click();
    }

    async verifyLogout() {
        await expect(this.page).toHaveURL(/login/);
        await expect(this.loginButton).toBeVisible();
    }

    async verifyRequiredMessages(count) {
        await expect(this.requiredMessage).toHaveCount(count);
    }
}