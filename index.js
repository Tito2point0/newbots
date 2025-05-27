require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db');
const initTable = require('./initDb'); // 👈 Imported from separate file
const cron = require('node-cron');

const URL = process.env.PRODUCT_URL;
const INTERVAL = parseInt(process.env.CHECK_INTERVAL || '60000');

async function checkStock() {
  try {
    console.log(`🌐 Checking ${URL}`);
    const { data: html } = await axios.get(URL, {
      headers: { 'Accept-Language': 'en-US,en;q=0.9' },
    });

    const $ = cheerio.load(html);
    const buttonText = $('button').text().toLowerCase();

    if (buttonText.includes('add to bag')) {
      console.log("🚨 In Stock!");
      await db('stock_logs').insert({ status: 'in_stock', message: 'Product in stock!' });
    } else {
      console.log("❌ Sold Out");
      await db('stock_logs').insert({ status: 'sold_out', message: 'Still sold out' });
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
    await db('stock_logs').insert({ status: 'error', message: err.message });
  }
}

(async () => {
  await initTable();
  console.log(`⏱️ Monitoring every ${INTERVAL / 1000}s...`);

  checkStock(); // Run immediately on start
  setInterval(checkStock, INTERVAL); // Run at interval

  // Optionally use cron if you prefer:
  // cron.schedule('*/1 * * * *', checkStock);
})();
