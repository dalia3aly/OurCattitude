const express = require('express');
const router = express.Router();
const userLogInController = require('../controllers/userLogInController');

router.post('/login', userLogInController.login);

module.exports = router;
