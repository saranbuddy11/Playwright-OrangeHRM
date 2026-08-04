import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class PIMPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new HeaderComponent(page);

        this.pimMenu = page.getByRole("link", { name: "PIM" });

        this.addEmployeeButton = page.getByRole("button", { name: "Add" });

        this.firstName = page.locator("input[name='firstName']");

        this.middleName = page.locator("input[name='middleName']");

        this.lastName = page.locator("input[name='lastName']");

        this.employeeId = page.locator("form input").nth(4);

        this.saveButton = page.getByRole("button", { name: "Save" });

        this.employeeIdInput = page.locator("input.oxd-input").nth(4);

        this.employeeListMenu = page.getByRole("link", { name: "Employee List" });

        this.searchEmployeeId = page.locator("form input").first();

        this.searchButton = page.getByRole("button", { name: "Search" });

        this.resultTable = page.locator(".oxd-table-body");

        this.employeeIdCell = page.locator(".oxd-table-body .oxd-table-cell").nth(1);

        this.employeeNameSearch = page.locator("input").nth(1);

        this.deleteButton = page.locator("button i.bi-trash");

        this.confirmDeleteButton = page.getByRole("button", { name: "Yes, Delete" });

        this.successToast = page.locator(".oxd-toast");

        this.noRecords = page.getByText("No Records Found");
    }

    getEmployeeRow(employeeId) {
        return this.page.locator(`.oxd-table-row:has-text("${employeeId}")`);
    }

    getDeleteButton(employeeId) {
        return this
            .getEmployeeRow(employeeId)
            .getByRole("button")
            .first();
    }

    async deleteEmployee(employeeId) {
        await this.getDeleteButton(employeeId).click();
    }

    async openPIM() {
        await this.pimMenu.click();
    }

    async clickAddEmployee() {
        await this.addEmployeeButton.click();
    }

    async fillEmployee(first, middle, last) {
        await this.firstName.fill(first);
        await this.middleName.fill(middle);
        await this.lastName.fill(last);
    }

    async saveEmployee() {
        await this.saveButton.click();
    }

    async verifyEmployeeCreated(firstName, lastName) {
        await expect(this.page).toHaveURL(/viewPersonalDetails/);
        await expect(this.firstName).toHaveValue(firstName);
        await expect(this.lastName).toHaveValue(lastName);
    }

    async getEmployeeId() {
        return await this.employeeIdInput.inputValue();
    }

    async openEmployeeListPage() {
        await this.employeeListMenu.click();
    }

    async searchEmployee(employeeId) {
        await this.searchEmployeeId.fill(employeeId);
        await this.searchButton.click();
    }

    async verifyEmployeeFound(employeeId) {
        await expect(this.getEmployeeRow(employeeId)).toBeVisible();
    }

    async verifyEmployeeName(employeeFirstName) {
        await expect(this.getEmployeeRow(employeeFirstName)).toBeVisible();
    }

    async searchByName(name) {
        await this.employeeNameSearch.fill(name);
        await this.searchButton.click();
    }

    async confirmDelete() {
        await this.confirmDeleteButton.click();
    }

    async verifyDeleteSuccess() {
        await expect(this.successToast).toContainText("Successfully Deleted");
    }

    async verifyEmployeeDeleted() {
        await expect(this.noRecords).toBeVisible();
    }

    async clearSearchFields() {
        await this.searchEmployeeId.clear();
        await this.employeeNameSearch.clear();
    }
}