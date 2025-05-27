// actions/acceptTerms.js

/**
 * Clicks the "ACCEPT" button if it's shown on the page.
 * Returns: 'accepted' | 'no_accept_button' | 'error'
 */

module.exports = async function acceptTerms(page) {
  try {
    // Wait briefly for button to load
    await page.waitForTimeout(1000);

    // Try to locate ACCEPT button (case-insensitive)
    const [acceptBtn] = await page.$x(
      "//button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'accept')]"
    );

    if (acceptBtn) {
      await acceptBtn.click();
      await page.waitForTimeout(500);
      console.log("✅ ACCEPT button clicked.");
      return 'accepted';
    }

    console.log("ℹ️ No ACCEPT button found.");
    return 'no_accept_button';

  } catch (err) {
    console.error("❌ Error in acceptTerms:", err.message);
    return 'error';
  }
};