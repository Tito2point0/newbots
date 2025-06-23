// actions/selectCheckbox.js
module.exports = async function selectCheckbox(page) {
  const selectorsToTry = [
    'div.index_checkbox__w_166',
    'div.index_checkboxLeft__2x_K1',
    'div.index_selectText__HDXz',
    'div[class*="checkbox"]'
  ];

  for (const selector of selectorsToTry) {
    const success = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return 'not_found';

      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const simulateClick = () => {
          const event = new MouseEvent('click', { bubbles: true, cancelable: true });
          el.dispatchEvent(event);
        };

        if (typeof el.click === 'function') {
          el.click();
        } else {
          simulateClick();
        }

        return 'clicked';
      } catch (e) {
        return `error: ${e.message}`;
      }
    }, selector);

    console.log(`🔍 Selector: "${selector}" → ${success}`);

    if (success === 'clicked') return `clicked: ${selector}`;
  }

  console.warn("⚠️ None of the checkbox selectors worked.");
  return 'failed';
};

