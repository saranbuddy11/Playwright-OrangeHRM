let username: string = "Admin";
let retryCount: number = 2;
let headless: boolean = true;
let browsers: string[] = [
    "chromium",
    "firefox"
];
console.log(username);
console.log(retryCount);
console.log(headless);
console.log(browsers);

function add(a: number, b: number): number {
    return a + b;
}

const result: number = add(10, 20);
console.log(result);