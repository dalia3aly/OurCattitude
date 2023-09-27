const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/dbConnect');  // Make sure this path is correct

class FoodProduct extends Model {}

FoodProduct.init({
  // Defined columns and data types
  foodID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'FoodProduct',
  tableName: 'foodproducts',  
});

module.exports = FoodProduct;
