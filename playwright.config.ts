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
        command: `PORT=${PORT} APPIE_E2E=1 npm run dev`,
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
