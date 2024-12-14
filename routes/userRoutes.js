const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddlewares.js');

const router = express.Router();

// Update the route parameter from 'id' to 'user_id'
router.get('/', authenticateToken, getAllUsers);
router.get('/:user_id', authenticateToken, getUserById);
router.post('/', authenticateToken, createUser);
router.put('/:user_id', authenticateToken, updateUser);
router.delete('/:user_id', authenticateToken, deleteUser); // Update here too

module.exports = router;
