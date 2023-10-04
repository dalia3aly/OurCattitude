const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
require('dotenv').config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ where: { username } });
  
  if (!existingUser) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ userID: existingUser.userID }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
  res.status(200).json({ token, existingUser });
};
