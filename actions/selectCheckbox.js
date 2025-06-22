// actions/selectCheckbox.js
module.exports = async function selectCheckbox(page) {
  try {
    const checkboxes = await page.$$('.index_checkbox__w_166');

    if (checkboxes.length === 0) {
      console.warn('⚠️ No checkboxes found.');
      return 'not_found';
    }

    for (const box of checkboxes) {
      await box.click();
    }

    console.log('☑️ All checkboxes clicked.');
    return 'clicked_all';
  } catch (err) {
    console.error('❌ Error selecting checkbox:', err.message);
    return 'error';
  }
};
