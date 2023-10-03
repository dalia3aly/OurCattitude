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
      const hashedPassword = await bcrypt.hash(password, 10);               // Enough processing rounds for the nature of my app
      
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




// Get user details

router.get('/:userID', async (req, res) => {

  const { userID } = req.params;

  try {
    // Finding the user by ID
    const user = await UserModel.findOne({ where: { userID: userID } });
    
    // Returning the user if found
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error in getting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
    


// Update user details

router.put('/:userID/update', 
  [
    body('username').optional().isString().isLength({ min: 6 }),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 }),
    body('location').optional().isString(),
    // May add more validations here if needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, email, location, password } = req.body;
    const userID = req.params.userID;

    try {
      let updatedFields = {};
      if (username) updatedFields.username = username;
      if (email) updatedFields.email = email;
      if (location) updatedFields.location = location;
      if (password) updatedFields.password = await bcrypt.hash(password, 10);   

      // Finding the user by ID
      const user = await UserModel.findOne({ where: { userID: userID } });
      
      // Updating the user if found
      if (user) {
        await user.update(updatedFields);
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error("Error in updating user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;
