import { test as base } from "./appFixtures.js";
import { generateEmployee } from "../utils/randomData.js";

export const test = base.extend({
    employeeData: async ({ }, use) => {
        await use(generateEmployee());
    }
});

export { expect } from "./appFixtures.js";