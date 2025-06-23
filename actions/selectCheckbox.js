// actions/selectCheckbox.js
module.exports = async function selectCheckbox(page) {
  const selectorsToTry = [
    'svg.index_checkboxBoxActive__LAaVV',
    'div.index_checkboxLeft__2x_K1 svg',
    'div.index_checkbox__w_166 svg',
    'svg[class*="checkbox"]'
  ];

  for (const selector of selectorsToTry) {
    try {
      const elHandle = await page.$(selector);
      if (!elHandle) {
        console.log(`🔍 Selector: "${selector}" → not_found`);
        continue;
      }

      await elHandle.evaluate(el => {
        el.scrollIntoView({ behavior: 'auto', block: 'center' });
      });

      await elHandle.click({ delay: 100 });
      console.log(`✅ Clicked using selector: ${selector}`);
      return `clicked: ${selector}`;
    } catch (err) {
      console.log(`❌ Error clicking selector "${selector}": ${err.message}`);
    }
  }

  console.warn("⚠️ All selectors failed to click checkbox.");
  return 'failed';
};