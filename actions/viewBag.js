// actions/viewBag.js
module.exports = async function viewBag(page) {
  try {
    const btnSelector = '.ant-btn.ant-btn-primary.ant-btn-dangerous.index_noticeFooterBtn__XpFsc';

    await page.waitForSelector(btnSelector, { visible: true, timeout: 8000 });
    await page.click(btnSelector);
    console.log("🛒 Clicked 'View Bag' button.");
    return 'clicked';
  } catch (err) {
    console.error("❌ Error clicking 'View Bag':", err.message);
    return 'error';
  }
};
