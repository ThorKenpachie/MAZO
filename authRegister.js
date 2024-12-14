const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'mysql-175ec073-gbox-adetmazo.l.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_fSIV2PXwSc7i2tQYxpI',
  database: 'defaultdb',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// /auth/register endpoint
app.post('/auth/register', async (req, res) => {
  const { fullname, username, password } = req.body;

  // Validate input fields
  if (!fullname || !username || !password) {
    return res.status(400).json({ error: 'All fields (fullname, username, password) are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  // Check if username already exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Database query error: ' + err.stack);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Password hashing error: ' + err.stack);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      // Insert the new user into the database
      const query = 'INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)';
      db.query(query, [fullname, username, hashedPassword], (err, results) => {
        if (err) {
          console.error('Database insertion error: ' + err.stack);
          return res.status(500).json({ error: 'Error saving user to database' });
        }

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
