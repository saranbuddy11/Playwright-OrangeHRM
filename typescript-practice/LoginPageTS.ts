import { Page, Locator, expect } from "@playwright/test";

export class LoginPageTS {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("input[name='username']");
        this.password = page.locator("input[name='password']");
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.errorMessage = page.locator(".oxd-alert-content-text");
    }

    async goto(): Promise<void> {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/");
    }

    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyDashboard(): Promise<void> {
        await expect(this.page).toHaveURL(/dashboard/);
    }

    async verifyError(message: string): Promise<void> {
        await expect(this.errorMessage).toContainText(message);
    }
}