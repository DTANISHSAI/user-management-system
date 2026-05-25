const { test, expect } = require('@playwright/test');

test('register + login flow', async ({ page }) => {

  await page.goto('https://dtanishsai.github.io/user-management-system/');

  // 👉 Go to Register
  await page.click('text=Register');

  // 👉 Wait for register form
  await page.waitForSelector('input[placeholder="Enter full name"]');

  // 👉 Fill registration
  const email = `test${Date.now()}@gmail.com`;

  await page.fill('input[placeholder="Enter full name"]', 'Test User');
  await page.fill('input[placeholder="Enter email"]', email);
  await page.fill('input[placeholder="Enter password"]', '123456');

  // 👉 Submit register
  await page.click('button:has-text("CREATE ACCOUNT")');

  // 👉 Wait until redirected to login page
  await expect(page).toHaveURL(/login/);

  // 👉 Login
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', '123456');

  await page.click('button:has-text("LOGIN")');

  // 👉 Verify navigation
  await expect(page).toHaveURL(/users/);

});







// const { test, expect } = require('@playwright/test');

// test('register + login flow', async ({ page }) => {

//   await page.goto('https://dtanishsai.github.io/user-management-system/');

//   await page.waitForTimeout(2000);

//   // 👉 Go to Register
//   await page.click('text=Register');
//   await page.waitForTimeout(2000);

//   // 👉 Fill registration
//   const email = `test${Date.now()}@gmail.com`; // unique email

//   await page.fill('input[placeholder="Enter full name"]', 'Test User');
//   await page.waitForTimeout(500);

//   await page.fill('input[placeholder="Enter email"]', email);
//   await page.waitForTimeout(500);

//   await page.fill('input[placeholder="Enter password"]', '123456');
//   await page.waitForTimeout(500);

//   // 👉 Submit register
//   await page.click('button:has-text("CREATE ACCOUNT")');
//   await page.waitForTimeout(3000);

//   // 👉 Now go to Login
//   await page.click('text=Login');
//   await page.waitForTimeout(2000);

//   // 👉 Fill login
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', '123456');

//   await page.click('button:has-text("LOGIN")');

//   await page.waitForTimeout(4000);

//   // 👉 Verify success
//   await expect(page).toHaveURL(/users/);

// });