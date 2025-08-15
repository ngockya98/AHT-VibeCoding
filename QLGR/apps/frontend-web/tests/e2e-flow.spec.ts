import { test, expect } from '@playwright/test';

test('login → search → order → invoice flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'admin@example.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);

  await page.goto('/marketplace');
  await expect(page.locator('h1')).toHaveText('Marketplace');
  await expect(page.locator('li')).toHaveCount(5);

  await page.goto('/inventory');
  await expect(page.locator('h1')).toHaveText('Inventory');

  await page.goto('/invoices/1');
  await expect(page.locator('h1')).toHaveText('Invoice Detail');
});
