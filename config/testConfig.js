const username = process.env.USERNAME || "Admin";
const password = process.env.PASSWORD || "admin123";

export const USERS = {
    admin: {
        username,
        password
    }
};