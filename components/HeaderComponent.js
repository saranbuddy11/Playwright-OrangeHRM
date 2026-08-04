export class HeaderComponent {

    constructor(page) {
        this.profileMenu = page.locator(".oxd-userdropdown-name");

        this.logout = page.getByRole("menuitem", { name: "Logout" });
    }

    async logout() {
        await this.profileMenu.click();
        await this.logout.click();
    }
}