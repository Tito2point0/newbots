// actions/selectCheckbox.js
module.exports = async function selectCheckbox(page) {
  const selectorsToTry = [
    'div.index_checkboxLeft__2x_K1',
    'div.index_checkbox__w_166',
    'div.index_selectText__HDXz',
    'svg.index_checkboxActive__LaAvY',
    'div[class*="checkbox"]',
  ];

  for (const selector of selectorsToTry) {
    try {
      const elementHandle = await page.$(selector);

      if (elementHandle) {
        console.log(`✅ Found: "${selector}"`);

        // Try clicking with Puppeteer directly
        try {
          await elementHandle.click({ delay: 50 });
          console.log(`☑️ Successfully clicked with .click(): "${selector}"`);
          return 'clicked';
        } catch (clickErr) {
          console.warn(`⚠️ .click() failed on "${selector}":`, clickErr.message);
        }

        // Try evaluate if click() fails
        const result = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (el && typeof el.click === 'function') {
            el.click();
            return true;
          }
          return false;
        }, selector);

        if (result) {
          console.log(`☑️ Clicked via evaluate(): "${selector}"`);
          return 'clicked';
        } else {
          console.warn(`⚠️ Element "${selector}" not clickable via evaluate().`);
        }
      } else {
        console.log(`❌ Not found: "${selector}"`);
      }

    } catch (err) {
      console.error(`❌ Error on "${selector}":`, err.message);
    }
  }

  console.warn("⚠️ None of the checkbox selectors worked.");
  return 'failed';
};
