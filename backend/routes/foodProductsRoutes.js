const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const FoodProduct = require('../models/FoodProduct');



// Testing endpoints:
// Get all food products : http://localhost:3000/api/foodproducts
// Get a specific food product : http://localhost:3000/api/foodproducts/1

// Routes for food products used in the food log/daily log

router.get('/foodproducts', verifyToken, async (req, res) => {
    try {
      const results = await FoodProduct.findAll({
        attributes: ['product'],
      });
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// Get a specific food product by ID
router.get('/foodproducts/:foodID', verifyToken, async (req, res) => {
    const foodID = req.params.foodID; 
    try {
        const results = await FoodProduct.findOne({
            where: { foodID },
            attributes: ['product'],
        });
        if (results === null) {
            return res.status(404).json({ message: 'No product found with this ID' });
        }
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

  
  module.exports = router;