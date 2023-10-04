const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const foodProductsController = require('../controllers/foodProductsController');

router.get('/foodproducts', verifyToken, foodProductsController.getAllFoodProducts);
router.get('/foodproducts/:foodID', verifyToken, foodProductsController.getFoodProductById);

module.exports = router;
