// actions/addToBag.js

module.exports = async function addToBag(page) {
  console.log('🛍️ Attempting to click "Add to Bag" using multiple selectors...');

  const methods = [
    {
      name: 'div.index_usBtn__2K1Ex',
      find: () => page.$('div.index_usBtn__2K1Ex')
    },
    {
      name: 'div.index_red__kx6Ql',
      find: () => page.$('div.index_red__kx6Ql')
    },
    {
      name: 'div.index_btnFull__F7k90',
      find: () => page.$('div.index_btnFull__F7k90')
    },
    {
      name: 'button text includes "add to bag"',
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
      name: 'xpath contains "ADD TO BAG"',
      find: async () => {
        const handles = await page.$x("//div[contains(text(), 'ADD TO BAG')]");
        return handles.length > 0 ? handles[0] : null;
      }
    }
  ];

  for (const method of methods) {
    try {
      const handle = await method.find();
      if (handle) {
        await handle.click();
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
