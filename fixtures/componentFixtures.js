import { test as base } from "./dataFixtures.js";
import { Header } from "../components/Header.js";

export const test = base.extend({
    header: async ({ page }, use) => {
        await use(new Header(page));
    }
});

export { expect } from "./dataFixtures.js";