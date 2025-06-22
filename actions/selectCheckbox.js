// actions/selectCheckbox.js
module.exports = async function selectCheckbox(page) {
  try {
    await page.waitForSelector('body', { timeout: 5000 });

    const results = await page.evaluate(() => {
      const log = [];
      const all = [...document.querySelectorAll('*')];
      const checkboxEls = all.filter(el => el.className && el.className.toString().includes('checkbox'));

      if (!checkboxEls.length) return { log: ['❌ No checkbox-like elements found.'], clicked: false };

      checkboxEls.forEach((el, i) => {
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });

          const evt = new MouseEvent('click', { bubbles: true, cancelable: true });
          el.dispatchEvent(evt);

          log.push(`✅ Clicked element [${i}]: ${el.className}`);
        } catch (e) {
          log.push(`❌ Failed to click element [${i}]: ${el.className} — ${e.message}`);
        }
      });

      return { log, clicked: checkboxEls.length > 0 };
    });

    results.log.forEach(l => console.log(l));
    return results.clicked ? 'clicked_some' : 'none_found';
  } catch (err) {
    console.error('❌ selectCheckbox() crashed:', err.message);
    return 'error';
  }
};
