const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/User');

router.post('/signup',
  [
    body('username').isString().isLength({ min: 6 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    // May add more validations here if needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, email, location, password } = req.body;

    try {
      // Hash the password and save the user
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await UserModel.create({
        //autoIncremented userID,
        username,
        email,
        location,
        password: hashedPassword
      });
      
      res.status(201).json(newUser);
    } catch (err) {
      console.error("Error in signup:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
