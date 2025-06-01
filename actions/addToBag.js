// actions/addToBag.js — version A

module.exports = async function addToBag(page) {
  try {
    const selector = 'div.index_usBtn__2KlEx.index_red__kx6Ql.index_btnFull__F7k90';

    await page.waitForSelector(selector, { visible: true, timeout: 8000 });

    const clicked = await page.evaluate((sel) => {
      const btn = document.querySelector(sel);
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    }, selector);

    if (clicked) {
      console.log("✅ Successfully clicked Add to Bag using evaluate()");
      return 'clicked';
    } else {
      console.warn("⚠️ Add to Bag div was not clickable");
      return 'not_found';
    }
  } catch (err) {
    console.error("❌ Error in addToBag:", err.message);
    return 'error';
  }
};
