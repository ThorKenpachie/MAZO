const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddlewares.js');

const router = express.Router();

// Get all users
router.get('/', authenticateToken, (req, res) => {
    console.log("Fetching all users...");
    getAllUsers(req, res);
});

// Get a user by ID
router.get('/:user_id', authenticateToken, (req, res) => {
    console.log(`Fetching user with ID: ${req.params.user_id}`);
    getUserById(req, res);
});

// Create a new user
router.post('/', authenticateToken, (req, res) => {
    console.log("Creating a new user...");
    createUser(req, res);
});

// Update a user by ID
router.put('/:user_id', authenticateToken, (req, res) => {
    console.log(`Updating user with ID: ${req.params.user_id}`);
    updateUser(req, res);
});

// Delete a user by ID
router.delete('/:user_id', authenticateToken, (req, res) => {
    console.log(`Deleting user with ID: ${req.params.user_id}`);
    deleteUser(req, res);
});

module.exports = router;