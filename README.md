# OrangeHRM Playwright Automation with CICD Pipeline

## Features

✔ Login
✔ Logout
✔ Employee CRUD
✔ JSON Data Driven
✔ POM
✔ HTML Reports
✔ Cross Browser
✔ Screenshots
✔ Traces

## Tech Stack

Playwright
JavaScript
Node.js

## Installation

npm install

## Execute

npm test

## Execute Chrome

npm run chromium

## Execute Firefox

npm run firefox

## HTML Report

npm run report
## Assignment coverage additions

The framework includes isolated implementations for the advanced assignment requirements without changing the existing POM/fixture contracts:

- `utils/databaseSeeder.js` - safe global test-data seeding adapter. Set `SEED_API_URL` to enable API-based remote seeding; otherwise a non-destructive seed manifest is used for the public demo environment.
- `tests/network-resilience.spec.js` - targeted API mocking, request validation, network abort, delayed-response timeout simulation, `test.slow()`, and `test.fixme()`/known-issue metadata.
- `tests/visual-components.spec.js` - element-specific visual regression. The same spec runs under Chromium and Firefox projects for browser-specific baselines.
- `tests/lifecycle-cleanup.spec.js` - `beforeEach` state initialization and guarded `afterEach` test-data cleanup for isolation.
- Global teardown removes seed state and temporary resources.

### Generate visual baselines

```bash
npx playwright test tests/visual-components.spec.js --project=chromium --update-snapshots
npx playwright test tests/visual-components.spec.js --project=firefox --update-snapshots
```

### Optional remote seed configuration

```env
SEED_API_URL=/your/test-only/seed/endpoint
```

Do not point `SEED_API_URL` at production. The default behavior does not modify the OrangeHRM public demo database.
