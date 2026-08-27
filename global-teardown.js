import { rm } from "fs/promises";
export default async function globalTeardown() {
    console.log("================================");
    console.log("GLOBAL TEARDOWN STARTED");
    try {
        await rm("./temp", { recursive: true, force: true });
        console.log("Temporary resources cleaned.");
    } catch (error) {
        console.log("Cleanup warning:", error.message);
    }
    console.log("GLOBAL TEARDOWN COMPLETED");
    console.log("================================");
}