export interface Employee {
    id?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    age?: number;
}

export type BrowserName =
    "chromium"
    | "firefox"
    | "webkit";

let browser: BrowserName;
browser = "chromium";
export const employeeData: Employee = {
    firstName: "David",
    middleName: "M",
    lastName: "Miller"
};