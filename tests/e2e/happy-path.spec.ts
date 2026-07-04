import { test, expect, request } from '@playwright/test';

test.describe('Instant Appie BETA happy path', () => {
  test.beforeEach(async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    await ctx.post('/appie/api/test-only', { data: { op: 'reset' } });
  });

  test('valid magic link -> wizard -> provisioning -> dashboard', async ({ page, baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const mintRes = await ctx.post('/appie/api/test-only', { data: { op: 'mint-token' } });
    expect(mintRes.ok()).toBeTruthy();
    const { token } = await mintRes.json();

    // Hit verify with the token. It should 303 to /appie/setup (no appie row yet).
    const verifyRes = await page.goto(`/appie/auth/verify?token=${token}`);
    // After redirect we're on /appie/setup
    await expect(page).toHaveURL(/\/appie\/setup(\?|$)/);
    // The verify response itself was a redirect; we don't need to assert the
    // intermediate response code since Playwright followed it. The PRD-mandated
    // Referrer-Policy header is asserted via a separate fetch in another test.
    expect(verifyRes).toBeTruthy();

    // Step 1: name
    await page.getByTestId('wizard-name').fill('Seyed');
    await page.getByRole('button', { name: /Volgende/ }).click();

    // Step 2: ICP (>=10 chars)
    await page.getByTestId('wizard-icp').fill('MKB-bouwbedrijven Zuid-Holland 5-50 medewerkers');
    await page.getByRole('button', { name: /Volgende/ }).click();

    // Step 3: voice
    await page.getByTestId('wizard-lang-nl').click();
    await page.getByTestId('wizard-tone-direct').click();
    await page.getByRole('button', { name: /Volgende/ }).click();

    // Step 4: telegram
    await page.getByTestId('wizard-telegram').fill('@seyed_test');
    await page.getByRole('button', { name: /Volgende/ }).click();

    // Step 5: tool (default selected)
    await page.getByTestId('wizard-tool-google_calendar').click();
    await page.getByTestId('finish-wizard').click();

    // Provisioning timeline shows up
    await expect(page).toHaveURL(/\/appie\/setup\/provisioning/);
    await expect(page.getByTestId('provision-timeline')).toBeVisible();

    // Wait for the polling to complete and bounce us to /appie/dashboard.
    await page.waitForURL(/\/appie\/dashboard/, { timeout: 30000 });
    await expect(page.getByTestId('appie-status-label')).toContainText(/online/i);
  });
});
