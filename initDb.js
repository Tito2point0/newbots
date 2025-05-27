// initDb.js
const db = require('./db');

async function initTable() {
  const exists = await db.schema.hasTable('stock_logs');
  if (!exists) {
    await db.schema.createTable('stock_logs', table => {
      table.increments('id').primary();
      table.string('status');
      table.text('message');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });
    console.log("✅ Created table: stock_logs");
  }
}

module.exports = initTable;
