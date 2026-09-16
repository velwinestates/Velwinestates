const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Prefer Supabase's IPv4-compatible pooler in hosted environments.
const DATABASE_URL = process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL;
const databaseUrlSource = process.env.DATABASE_POOLER_URL ? 'DATABASE_POOLER_URL' : 'DATABASE_URL';

if (!DATABASE_URL || DATABASE_URL.includes('YOUR_')) {
  console.warn('⚠️ Database URL not properly configured. Using JSON file fallback.');
  console.warn('⚠️ Add DATABASE_POOLER_URL (recommended) or DATABASE_URL to the server environment.');
  
  // Export dummy functions that indicate database is not configured
  module.exports = {
    query: async () => {
      throw new Error('Database not configured. Please add DATABASE_URL to .env');
    },
    pool: null,
    isConfigured: false
  };
} else {
  console.log('🔧 Attempting to connect to Supabase...');
  console.log(`📊 Database URL configured from ${databaseUrlSource}:`, DATABASE_URL.substring(0, 50) + '...');
  
  // Create a connection pool
  const pool = new Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 10000,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Test the connection
  pool.on('connect', () => {
    console.log('✅ Connected to Supabase PostgreSQL');
  });

  pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err.message);
  });

  // Test connection immediately
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('❌ Failed to connect to Supabase:', err.message);
    } else {
      console.log('✅ Supabase connection test successful!');
    }
  });

  // Export query function
  const query = (text, params) => {
    console.log('📝 Executing query:', text.substring(0, 50) + '...');
    return pool.query(text, params);
  };

  module.exports = {
    query,
    pool,
    isConfigured: true
  };
}

