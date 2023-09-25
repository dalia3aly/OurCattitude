const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('JWT verify error:', err);  // Debug line
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }

    req.userID = decoded.userID;  // Storing userID from decoded payload to request object
    console.log('Decoded JWT:', decoded);  // Debug line
    next();
  });
};

module.exports = verifyToken;
