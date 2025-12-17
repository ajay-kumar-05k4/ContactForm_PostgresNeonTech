const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function createTable() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const query = `
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(query);
    console.log('Contacts table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

createTable();
