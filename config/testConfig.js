const username = process.env.ORANGEHRM_USERNAME || "Admin";
const password = process.env.ORANGEHRM_PASSWORD || "admin123";

export const USERS = {
    admin: {
        username,
        password
    }
};