import { mkdir } from 'fs/promises';

export default async function globalSetup() {
  await mkdir('reports', { recursive: true });
  await mkdir('screenshots', { recursive: true });
  console.log('Global setup completed.');
}
