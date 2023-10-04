const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userSignUpController = require('../controllers/userSignUpController');


// Validation rules for signup
const signupValidations = [
  body('username').isString().isLength({ min: 6 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

// Validation rules for updating user
const updateUserValidations = [
  body('username').optional().isString().isLength({ min: 6 }),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('location').optional().isString(),
];

// Routes
router.post('/signup', signupValidations, userSignUpController.signUp);
router.get('/:userID', userSignUpController.getUserById);
router.put('/:userID/update', updateUserValidations, userSignUpController.updateUser);

module.exports = router;
