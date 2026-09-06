const db = require('./db');

async function main() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS plans (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      duration VARCHAR(100) DEFAULT 'Monthly',
      description TEXT DEFAULT '',
      popular BOOLEAN DEFAULT false,
      features JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('plans table is ready.');
}

main()
  .catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (db.pool) await db.pool.end();
  });
