import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./typescript-practice",
    timeout: 30000,
    reporter: [
        ["list"],
        ["html", {
            outputFolder: "typescript-report",
            open: "never"
        }]
    ],
    use: {
        headless: true,
        screenshot: "only-on-failure",
        trace: "retain-on-failure"
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        }
    ]
});