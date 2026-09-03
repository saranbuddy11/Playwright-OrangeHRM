import { rm } from 'fs/promises';
import { cleanupSeedData } from './utils/databaseSeeder.js';

export default async function globalTeardown() {
  console.log('================================');
  console.log('GLOBAL TEARDOWN STARTED');
  try {
    await cleanupSeedData();
    await rm('./temp', { recursive: true, force: true });
    console.log('Seed state and temporary resources cleaned.');
  } catch (error) {
    console.log('Cleanup warning:', error.message);
  }
  console.log('GLOBAL TEARDOWN COMPLETED');
  console.log('================================');
}
