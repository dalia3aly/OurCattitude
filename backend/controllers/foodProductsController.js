const { sequelize } = require('../database/dbConnect');
const FoodProduct = require('../models/FoodProduct');

const getAllFoodProducts = async (req, res) => {
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
};

const getFoodProductById = async (req, res) => {
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
};

module.exports = {
  getAllFoodProducts,
  getFoodProductById,
};
