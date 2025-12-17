const { Client } = require('pg');

class Contact {
  constructor() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async connect() {
    await this.client.connect();
  }

  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await this.client.query(query);
  }

  async save(name, email, message) {
    const query = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)';
    await this.client.query(query, [name, email, message]);
  }

  async getAll() {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const result = await this.client.query(query);
    return result.rows;
  }

  async close() {
    await this.client.end();
  }
}

module.exports = Contact;
