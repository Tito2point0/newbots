// utils/addToBag.js
module.exports = async function addToBag(page) {
  try {
    await page.waitForSelector('button', { timeout: 10000 });

    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await btn.evaluate(node => node.innerText.trim().toLowerCase());
      if (text.includes('add to bag')) {
        await btn.click();
        console.log("🛒 Clicked 'Add to Bag'");
        return 'clicked';
      }
    }

    console.log("❌ 'Add to Bag' button not found");
    return 'not_found';
  } catch (err) {
    console.error("❌ Error in addToBag:", err.message);
    return 'error';
  }
};
