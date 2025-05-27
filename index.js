// index.js

require('dotenv').config();
const puppeteer = require('puppeteer');
const acceptTerms = require('./actions/acceptTerms');

const URL = process.env.PRODUCT_URL;

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 30 });
  const page = await browser.newPage();

  console.log("🌍 Navigating to product page...");
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });

  const result = await acceptTerms(page);
  console.log("📋 acceptTerms() result:", result);

  // Save screenshot
  await page.screenshot({ path: 'accept_test.png', fullPage: true });
  console.log("📸 Screenshot saved as accept_test.png");

  await browser.close();
})();
