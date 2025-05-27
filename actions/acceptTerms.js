// utils/acceptTerms.js

module.exports = async function acceptTerms(page) {
  try {
    const btnSelector = '.policy_acceptBtn__ZNU71';

    // Give time for modal to render
    await page.waitForSelector(btnSelector, { visible: true, timeout: 8000 });

    await page.click(btnSelector);
    console.log("✅ Successfully clicked ACCEPT button via selector:", btnSelector);
    return 'accepted';

  } catch (err) {
    console.error("❌ Error clicking accept button:", err.message);
    await page.screenshot({ path: 'accept_button_error.png' });
    return 'error';
  }
};
