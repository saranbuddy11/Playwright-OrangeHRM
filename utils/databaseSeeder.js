import { mkdir, writeFile, rm } from 'fs/promises';
import { request } from '@playwright/test';

const SEED_STATE_FILE = './temp/seed-state.json';

/**
 * Safe enterprise-style test data seeding adapter.
 *
 * OrangeHRM's public demo does not expose direct database credentials. To keep
 * this framework non-destructive, seeding is API-driven only when SEED_API_URL
 * is explicitly configured. Otherwise, a deterministic seed manifest is
 * created so the global setup lifecycle and seed contract remain testable.
 */
export async function seedDatabase(config) {
  await mkdir('./temp', { recursive: true });

  const seedPayload = {
    runId: `pw-${Date.now()}`,
    environment: process.env.TEST_ENV || process.env.ENVIRONMENT || 'default',
    records: [
      { entity: 'employee', alias: 'assignment-seed-user', enabled: true }
    ]
  };

  const seedApiUrl = process.env.SEED_API_URL;
  let mode = 'manifest-only';

  if (seedApiUrl) {
    const baseURL = config?.projects?.find(project => project.use?.baseURL)?.use?.baseURL
      || config?.use?.baseURL
      || process.env.BASE_URL;

    const api = await request.newContext({ baseURL });
    try {
      const response = await api.post(seedApiUrl, { data: seedPayload });
      if (!response.ok()) {
        throw new Error(`Seed API failed with HTTP ${response.status()}`);
      }
      mode = 'api-seed';
    } finally {
      await api.dispose();
    }
  }

  const state = { ...seedPayload, mode, createdAt: new Date().toISOString() };
  await writeFile(SEED_STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  console.log(`Test-data seed completed (${mode}).`);
  return state;
}

export async function cleanupSeedData() {
  // Remote cleanup can be added through a project-specific cleanup API.
  // The public OrangeHRM demo is intentionally left untouched by default.
  await rm(SEED_STATE_FILE, { force: true });
}
