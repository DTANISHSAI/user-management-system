// playwright.config.js

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: false,   // show browser
    slowMo: 1000       // 👈 THIS is the correct place
  },
  workers: 1
});