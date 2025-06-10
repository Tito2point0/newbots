// actions/viewCart.js
module.exports = async function viewCart(page) {
  try {
    const cartSelector = 'div.index_cartItem__xumFD';

    await page.waitForSelector(cartSelector, { visible: true, timeout: 10000 });

    // Scroll into view just in case
    await page.evaluate(selector => {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, cartSelector);



    const result = await page.evaluate(selector => {
      const el = document.querySelector(selector);
      if (el && typeof el.click === 'function') {
        el.click();
        return true;
      }
      return false;
    }, cartSelector);

    if (result) {
      console.log('🛒 Successfully clicked Cart icon.');
      return 'clicked';
    } else {
      console.warn('⚠️ Cart element not clickable via JS.');
      return 'not_clickable';
    }

  } catch (err) {
    console.error('❌ Error clicking Cart icon:', err.message);
    return 'error';
  }
};
