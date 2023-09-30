const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

require('dotenv').config();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user with the given login details exists
  const existingUser = await UserModel.findOne({ where: { username } });

  if (!existingUser) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate JWT token
  console.log('Existing User:', existingUser);      // for further verification during testing
  const token = jwt.sign({ userID: existingUser.userID }, process.env.JWT_SECRET, { expiresIn: '2h' });

  // Send token and user data
  res.status(200).json({ token, existingUser });
});

module.exports = router;
