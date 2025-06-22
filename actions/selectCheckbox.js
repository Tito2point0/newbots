// actions/selectCheckbox.js
module.exports = async function selectCheckbox(page) {
  const checkboxSelector = 'div.index_checkbox__w_166 input[type="checkbox"]';

  try {
    // Wait until checkbox is available in the DOM and visible
    await page.waitForSelector(checkboxSelector, { visible: true, timeout: 8000 });

    // Click the checkbox using Puppeteer's built-in method
    await page.click(checkboxSelector);

    console.log('☑️ Successfully clicked checkbox using wait and page.click().');
    return 'clicked';
  } catch (err) {
    console.error('❌ Error selecting checkbox:', err.message);
    return 'error';
  }
};
