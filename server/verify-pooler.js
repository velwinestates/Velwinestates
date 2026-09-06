const db = require('./db');

async function main() {
  const result = await db.query('SELECT current_database() AS database');
  console.log(JSON.stringify(result.rows[0]));
  const tables = await db.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('companies', 'products', 'site_media', 'plans') ORDER BY table_name"
  );
  console.log(JSON.stringify({ tables: tables.rows.map(row => row.table_name) }));
}

main()
  .catch(error => {
    console.error('Pooler connection failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (db.pool) await db.pool.end();
  });
