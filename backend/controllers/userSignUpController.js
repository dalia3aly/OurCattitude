const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const UserModel = require('../models/User');

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, location, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      location,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// For future use in Account management page
exports.getUserById = async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await UserModel.findOne({ where: { userID: userID } });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error in getting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
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

    const user = await UserModel.findOne({ where: { userID: userID } });

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
};

