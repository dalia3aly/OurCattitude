const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { sequelize, Sequelize } = require('../database/dbConnect');
const FoodProduct = require('../models/FoodProduct');



// Testing endpoints:
// Get all food products : http://localhost:3000/api/foodproducts
// Get a specific food product : http://localhost:3000/api/foodproducts/1

// Routes for food products used in the food log/daily log, concatenating brand and product as fullProductName

router.get('/foodproducts', verifyToken, async (req, res) => {
    try {
      const results = await FoodProduct.findAll({
        attributes: [
          'foodID',
          'type',
          'weight',
          'country',
          [sequelize.fn('CONCAT', sequelize.col('brand'), ' ', sequelize.col('product')), 'fullProductName']
        ],
      });
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// Get a specific food product by ID, concatenated as fullProductName (e.g. 'Royal Canin Kitten')
router.get('/foodproducts/:foodID', verifyToken, async (req, res) => {
    const foodID = req.params.foodID;
    try {
      const results = await FoodProduct.findOne({
        where: { foodID },
        attributes: [
          'foodID',
          'type',
          'weight',
          'country',
          [sequelize.fn('CONCAT', sequelize.col('brand'), ' ', sequelize.col('product')), 'fullProductName']
        ],
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