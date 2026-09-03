import { mkdir } from 'fs/promises';
import { seedDatabase } from './utils/databaseSeeder.js';

export default async function globalSetup(config) {
  console.log('================================');
  console.log('GLOBAL SETUP STARTED');
  await mkdir('reports', { recursive: true });
  await mkdir('screenshots', { recursive: true });
  console.log(`Environment: ${process.env.TEST_ENV || process.env.ENVIRONMENT || 'default'}`);
  console.log('Validating execution environment...');
  if (!process.env.BASE_URL) {
    console.log('BASE_URL not provided. Using configured default.');
  }

  await seedDatabase(config);

  console.log('GLOBAL SETUP COMPLETED');
  console.log('================================');
}
