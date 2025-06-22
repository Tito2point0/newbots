module.exports = async function selectAllCheckboxes(page) {
  try {
    const result = await page.evaluate(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      let clickedCount = 0;

      checkboxes.forEach(cb => {
        const isVisible = cb.offsetParent !== null;
        if (isVisible && !cb.checked) {
          cb.click();
          clickedCount++;
        }
      });

      return clickedCount;
    });

    console.log(`☑️ Clicked ${result} checkboxes.`);
    return result > 0 ? 'clicked_some' : 'none_found';
  } catch (err) {
    console.error('❌ Error selecting checkboxes:', err.message);
    return 'error';
  }
};
