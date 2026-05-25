const { test, expect } = require('@playwright/test');

test('full flow: register + login + create + delete', async ({ page }) => {

  await page.goto('https://dtanishsai.github.io/user-management-system/');

  // 👉 REGISTER
  await page.click('text=Register');

  await page.waitForSelector('input[placeholder="Enter full name"]');

  const email = `auto${Date.now()}@gmail.com`;

  await page.fill('input[placeholder="Enter full name"]', 'Auto User');
  await page.fill('input[placeholder="Enter email"]', email);
  await page.fill('input[placeholder="Enter password"]', '123456');

  await page.click('button:has-text("CREATE ACCOUNT")');

// 👉 Wait for success toast/message (VERY IMPORTANT)
await page.waitForSelector('text=success', { timeout: 10000 }).catch(() => {});

// 👉 Then confirm login page
await expect(page).toHaveURL(/login/);

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', '123456');

  await page.click('button:has-text("LOGIN")');

    // 👉 Wait until dashboard loads
  await expect(page).toHaveURL(/users/);

  // 👉 CREATE USER
  const newEmail = `user${Date.now()}@gmail.com`;

  await page.fill('input[placeholder="Enter full name"]', 'New User');
  await page.fill('input[placeholder="Enter email address"]', newEmail);
  await page.fill('input[placeholder="Enter password"]', '123456');

  await page.click('button:has-text("Add User")');

  // 👉 VERIFY user appears
  await expect(page.locator('text=New User')).toBeVisible();

  // 👉 DELETE USER
  await page.click('button:has-text("Delete")');

});





// const { test, expect } = require('@playwright/test');

// test('full flow: register + login + create + delete', async ({ page }) => {

//   await page.goto('https://dtanishsai.github.io/user-management-system/');
//   await page.waitForTimeout(2000);

//   // 👉 REGISTER
//   await page.click('text=Register');
//   await page.waitForTimeout(2000);

//   const email = `auto${Date.now()}@gmail.com`;

//   await page.fill('input[placeholder="Enter full name"]', 'Auto User');
//   await page.fill('input[placeholder="Enter email"]', email);
//   await page.fill('input[placeholder="Enter password"]', '123456');

//   await page.click('button:has-text("CREATE ACCOUNT")');
//   await page.waitForTimeout(3000);

//   // 👉 LOGIN
//   await page.click('text=Login');
//   await page.waitForTimeout(2000);

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', '123456');

//   await page.click('button:has-text("LOGIN")');
//   await page.waitForTimeout(3000);

//   // 👉 CREATE USER
//   const newEmail = `user${Date.now()}@gmail.com`;

//   await page.fill('input[placeholder="Enter full name"]', 'New User');
//   await page.fill('input[placeholder="Enter email address"]', newEmail);
//   await page.fill('input[placeholder="Enter password"]', '123456');

//   await page.click('button:has-text("Add User")');
//   await page.waitForTimeout(3000);

//   // 👉 VERIFY
//   await expect(page.locator('text=New User')).toBeVisible();

//   // 👉 DELETE USER
//   await page.click('button:has-text("Delete")');
//   await page.waitForTimeout(2000);

// });