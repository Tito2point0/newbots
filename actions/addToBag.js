// actions/addToBag.js

module.exports = async function addToBag(page) {
  console.log('🛍️ Attempting to click "Add to Bag" using all methods...');

  const methods = [
    {
      name: 'full class selector',
      selector: 'div.index_usBtn__2K1Ex.index_red__kx6Ql.index_btnFull__F7k90',
      find: () => page.$('div.index_usBtn__2K1Ex.index_red__kx6Ql.index_btnFull__F7k90')
    },
    {
      name: 'text includes "add to bag" (button)',
      find: async () => {
        const buttons = await page.$$('button');
        for (const btn of buttons) {
          const text = await page.evaluate(el => el.innerText.toLowerCase(), btn);
          if (text.includes('add to bag')) return btn;
        }
        return null;
      }
    },
    {
      name: 'xpath contains "Add to Bag"',
      find: () => page.$x("//div[contains(text(), 'ADD TO BAG')]")
    }
  ];

  for (const method of methods) {
    try {
      const handle = await method.find();
      const element = Array.isArray(handle) ? handle[0] : handle;

      if (element) {
        await element.click();
        console.log(`✅ Clicked Add to Bag using method: ${method.name}`);
        return `clicked_via_${method.name}`;
      } else {
        console.warn(`⚠️ Selector failed: ${method.name}`);
      }
    } catch (err) {
      console.error(`❌ Error in method ${method.name}:`, err.message);
    }
  }

  return 'not_found';
};
