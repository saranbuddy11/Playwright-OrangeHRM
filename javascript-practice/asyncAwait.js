function loginUser(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (
                username === "Admin" &&
                password === "admin123"
            ) {
                resolve({
                    username,
                    status:
                        "Login Successful"
                });
            } else {
                reject(
                    new Error(
                        "Invalid credentials"
                    )
                );
            }
        }, 1000);
    }
    );
}

async function performLogin() {
    try {
        console.log("Starting async login...");
        const result =
            await loginUser(
                "Admin",
                "admin123"
            );
        console.log("Async/Await Result:", result);
    } catch (error) {
        console.error("Async Error:", error.message);
    } finally {
        console.log("Async operation finished");
    }
}

performLogin();