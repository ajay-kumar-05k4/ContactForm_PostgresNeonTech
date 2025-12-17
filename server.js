const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const query = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)';
    await client.query(query, [name, email, message]);
    res.json({ success: true, message: 'Contact form submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error submitting form' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
