// db/initDb.js
const db = require('./db');

async function initTable() {
  const exists = await db.schema.hasTable('stock_logs');

  if (exists) {
    const hasCheckedAt = await db.schema.hasColumn('stock_logs', 'checked_at');
    if (!hasCheckedAt) {
      await db.schema.alterTable('stock_logs', table => {
        table.timestamp('checked_at').defaultTo(db.fn.now());
      });
      console.log('✅ Added missing column: checked_at');
    } else {
      console.log('ℹ️ Table already has `checked_at` column.');
    }
  } else {
    await db.schema.createTable('stock_logs', table => {
      table.increments('id').primary();
      table.string('status');
      table.text('message');
      table.integer('http_status');
      table.timestamp('checked_at').defaultTo(db.fn.now());
    });
    console.log("✅ Created table: stock_logs");
  }
}

module.exports = initTable;
