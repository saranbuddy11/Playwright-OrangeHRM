export function generateEmployee() {
    const random = Date.now();
    return {
        firstName: `John${random}`,
        middleName: "M",
        lastName: `David${random}`
    };
}