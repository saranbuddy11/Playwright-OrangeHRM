import { readFile, writeFile } from "fs/promises";

/**
 * Save current browser sessionStorage to a JSON file.
 *
 * @param {import("@playwright/test").Page} page
 * @param {string} filePath
 */
export async function saveSessionStorage(page, filePath) {
    const sessionData = await page.evaluate(() => {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = sessionStorage.getItem(key);
        }
        return data;
    });
    await writeFile(filePath, JSON.stringify(sessionData, null, 2));
    console.log(`Session storage saved to ${filePath}`);
}

/**
 * Read saved sessionStorage data from file.
 *
 * @param {string} filePath
 */
export async function readSessionStorage(filePath) {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
}

/**
 * Restore sessionStorage into a new browser context.
 *
 * @param {import("@playwright/test").BrowserContext} context
 * @param {Object} sessionData
 */
export async function restoreSessionStorage(context, sessionData) {
    await context.addInitScript((storage) => {
        for (const [key, value] of Object.entries(storage)) {
            window.sessionStorage.setItem(key, value);
        }
    }, sessionData);
}