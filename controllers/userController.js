const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id, fullname, username, created_at, updated_at FROM users');
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id || isNaN(Number(user_id))) {
    return res.status(400).json({ error: 'Invalid please input numbers only' });
  }

  try {
    const [rows] = await pool.query('SELECT user_id, fullname, username, created_at, updated_at FROM users WHERE user_id = ?', [user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'The user can not be found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
    const { fullname, username, passwordx } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(passwordx, 10);
      const [result] = await pool.query('INSERT INTO users (fullname, username, passwordx) VALUES (?, ?, ?)', [fullname, username, hashedPassword]);
      res.status(201).json({ user_id: result.insertId, fullname, username, passwordx });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { fullname, username, passwordx } = req.body;

  if (!user_id || isNaN(Number(user_id))) {
      return res.status(400).json({ error: 'Invalid or missing ID' });
  }

  if (!fullname || !username || !passwordx) {
    return res.status(400).json({ error: 'Fullname, username, and password are required' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(passwordx, 10);
    // Corrected column name from users_id to user_id
    const [result] = await pool.query('UPDATE users SET fullname = ?, username = ?, passwordx = ? WHERE user_id = ?', [fullname, username, hashedPassword, user_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cannot update, User cannot be found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id || isNaN(Number(user_id))) {
      return res.status(400).json({ error: 'Invalid or missing ID' });
  }

  try {
    // Ensure the column name is user_id
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User cannot be found' });
    }

    res.json({ message: 'The user has been deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
