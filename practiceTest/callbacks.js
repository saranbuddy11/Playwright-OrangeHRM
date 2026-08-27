function fetchUserData(userId, callback) {
    console.log("Fetching user...");
    setTimeout(() => {
        if (userId > 0) {
            const user = {
                id: userId,
                name: "Admin"
            };
            callback(null, user);
        } else {
            callback(
                new Error("Invalid user ID"),
                null
            );
        }
    }, 1000);
}

fetchUserData(6, (error, user) => {
    if (error) {
        console.error(
            "Callback Error:",
            error.message
        );
        return;
    }
    console.log(
        "Callback Result:",
        user
    );
});