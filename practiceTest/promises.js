function loginUser(username, password) {
    return new Promise((resolve, reject) => {
        console.log("Login request started...");
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

loginUser("Admin", "admin123").then(result => {
    console.log(
        "Promise Success:",
        result
    );
}).catch(error => {
    console.error(
        "Promise Failure:",
        error.message
    );
})
    .finally(() => {
        console.log("Promise execution completed");
    });