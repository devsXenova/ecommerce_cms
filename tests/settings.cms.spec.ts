import { expect, test } from '@playwright/test';
import { attachNetworkMonitor, expectNoCriticalClientIssues } from './utils/networkAssertions';

test.use({ storageState: 'tests/.auth/admin.json' });

test('settings page renders all tabs', async ({ page }) => {
  await page.goto('/settings');
  await expect(page).toHaveURL(/\/settings$/);
  const monitor = attachNetworkMonitor(page);

  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: /general/i })).toBeVisible();
  await expect(page.getByRole('tab', { name: /shipping/i })).toBeVisible();
  await expect(page.getByRole('tab', { name: /payment/i })).toBeVisible();
  await expect(page.getByRole('tab', { name: /appearance/i })).toBeVisible();

  expectNoCriticalClientIssues(monitor.stop(), '/settings');
});
