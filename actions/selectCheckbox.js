``// actions/selectCheckbox.js
module.exports = async function selectCheckbox(page) {
  try {
    const checkboxSelector = 'div.index_checkboxLeft__2x_K1 input[type="checkbox"]';

    const result = await page.evaluate(selector => {
      const el = document.querySelector(selector);
      if (el && typeof el.click === 'function') {
        el.click();
        return true;
      }
      return false;
    }, checkboxSelector);

    if (result) {
      console.log('☑️ Successfully clicked checkbox.');
      return 'clicked';
    } else {
      console.warn('⚠️ Checkbox element not clickable.');
      return 'not_clickable';
    }

  } catch (err) {
    console.error('❌ Error selecting checkbox:', err.message);
    return 'error';
  }
};
