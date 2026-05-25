const { test, expect } = require('@playwright/test');

test('invalid login shows error', async ({ page }) => {

  await page.goto('https://dtanishsai.github.io/user-management-system/');

  await page.click('text=Login');

  await page.waitForSelector('input[type="email"]');

  await page.fill('input[type="email"]', 'wrong@gmail.com');
  await page.fill('input[type="password"]', 'wrongpass');

  await page.click('button:has-text("LOGIN")');

  await expect(page.locator('text=Invalid')).toBeVisible();

});