import { test, expect } from "@playwright/test";

test("GET API - validate response", async ({ request }) => {
    const response = await request.get("https://jsonplaceholder.typicode.com/users/1");
    console.log("Status:", response.status());
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log("Response Body:", body);
    expect(body.id).toBe(1);
    expect(body.name).toBeTruthy();
});

test("POST API - create resource", async ({ request }) => {
    const payload = {
        title: "Playwright API Testing",
        body: "Automation Practice",
        userId: 1
    };
    const response = await request.post("https://jsonplaceholder.typicode.com/posts",
        { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log(body);
    expect(body.title).toBe(payload.title);
    expect(body.userId).toBe(payload.userId);
});