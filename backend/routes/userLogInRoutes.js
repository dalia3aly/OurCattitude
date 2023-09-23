const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user with the given login details exists
  const existingUser = await UserModel.findOne({ where: { username: req.body.username } });

  if (!existingUser) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: existingUser.id }, 'your-secret-key', { expiresIn: '2h' });

  // Send token and user data
  res.status(200).json({ token, existingUser });
});

module.exports = router;
