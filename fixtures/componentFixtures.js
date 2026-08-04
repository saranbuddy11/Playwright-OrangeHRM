import { test as base, expect } from "./appFixtures.js";
import { HeaderComponent } from "../components/HeaderComponent.js";

export const test = base.extend({
    header: async ({ page }, use) => {
        await use(new HeaderComponent(page));
    }
});

export { expect };