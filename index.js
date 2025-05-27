require('dotenv').config();
const puppeteer = require('puppeteer');
const db = require('./db/db');
const acceptTerms = require('./actions/acceptTerms');
const addToBag = require('./actions/addToBag');

const URL = process.env.PRODUCT_URL;
const INTERVAL = parseInt(process.env.CHECK_INTERVAL || '10000');

async function init() {
  if (!URL) {
    console.error("❌ PRODUCT_URL is not set in .env");
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log("🌐 Navigating to product page...");
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const accepted = await acceptTerms(page);
    console.log("📋 acceptTerms() result:", accepted);

    const addStatus = await addToBag(page);
    console.log("📦 addToBag() result:", addStatus);

    await db('stock_logs').insert({
      status: addStatus === 'clicked' ? 'in_stock' : 'sold_out',
      message: addStatus === 'clicked' ? 'Product in stock and added to cart' : 'Still sold out or button not found'
    });
  } catch (err) {
    console.error("❌ Error during check:", err.message);
    await db('stock_logs').insert({ status: 'error', message: err.message });
  } finally {
    await browser.close();
    console.log("🧼 Browser session closed.");
    setTimeout(init, INTERVAL);
  }
}

init();
