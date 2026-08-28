function fetchUser() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Admin"
            });
        }, 1500);
    });
}

function fetchPermissions() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                "PIM",
                "Admin",
                "Leave"
            ]);
        }, 1500);
    });
}

async function loadDashboardData() {
    console.time("Execution Time");
    const [
        user,
        permissions
    ] = await Promise.all([
        fetchUser(),
        fetchPermissions()
    ]);
    console.timeEnd("Execution Time");
    console.log(user);
    console.log(permissions);
}

loadDashboardData();