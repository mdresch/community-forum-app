const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');

// Import the compiled User model from the main app's models directory
const User = require(path.join(__dirname, '../../models/User.js'));

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
