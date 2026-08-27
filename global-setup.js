import { mkdir } from 'fs/promises';

export default async function globalSetup() {
  console.log("================================");
  console.log("GLOBAL SETUP STARTED");
  await mkdir('reports', { recursive: true });
  await mkdir('screenshots', { recursive: true });
  console.log(`Environment: ${process.env.TEST_ENV || "default"}`);
  console.log("Validating execution environment...");
  if (!process.env.BASE_URL) {
    console.log("BASE_URL not provided. " + "Using configured default.");
  }
  console.log("GLOBAL SETUP COMPLETED");
  console.log("================================");
}
