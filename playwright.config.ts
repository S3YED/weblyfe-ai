import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT ?? '3100';
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  webServer: process.env.SKIP_WEBSERVER
    ? undefined
    : {
        // E2E mode bypasses Postgres via the in-memory test store, but the JWT/secretbox
        // boot validators still run. Inject deterministic dev values so the dev server
        // is allowed to start. NEVER ship these values; they are visible in the repo.
        command: `PORT=${PORT} APPIE_E2E=1 JWT_SECRET=test-jwt-secret-must-be-at-least-32-bytes-long SECRETBOX_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef NEXT_PUBLIC_APP_URL=${BASE_URL} npm run dev`,
        url: BASE_URL,
        timeout: 120_000,
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
