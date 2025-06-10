require('dotenv').config();
const puppeteer = require('puppeteer');
const db = require('./db/db');
const acceptTerms = require('./actions/acceptTerms');
const addToBag = require('./actions/addToBag');
const ora = require('ora').default;
const initTable = require('./db/initDb'); // ✅ NEW

const URL = process.env.PRODUCT_URL;
const INTERVAL = parseInt(process.env.CHECK_INTERVAL || '10000');
const USER_AGENT = process.env.USER_AGENT || 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

async function init() {
  if (!URL) {
    console.error("❌ PRODUCT_URL is not set in .env");
    process.exit(1);
  }

  await initTable(); // ✅ Ensures DB table and columns are ready

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);

  const spinner = ora('🌐 Navigating to product page...').start();

  try {
    const response = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    if (!response) throw new Error("No response from page.goto()");
    const status = response.status();
    spinner.succeed(`📡 Page loaded successfully (HTTP ${status})`);

    const accepted = await acceptTerms(page);
    console.log("📋 acceptTerms() result:", accepted);

    const addStatus = await addToBag(page);
    console.log("📦 addToBag() result:", addStatus);

    await db('stock_logs').insert({
      status: addStatus.includes('clicked') ? 'in_stock' : 'sold_out',
      message: `addToBag result: ${addStatus}`,
      http_status: status,
      checked_at: new Date().toISOString()
    });
  } catch (err) {
    spinner.fail("❌ Failed to load page or complete actions.");
    console.error("❌ Error during check:", err.stack);
    await db('stock_logs').insert({
      status: 'error',
      message: err.stack,
      checked_at: new Date().toISOString()
    });
  } finally {
  

    setTimeout(init, INTERVAL);
  }
}

init();
