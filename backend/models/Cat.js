const { Model, DataTypes } = require('sequelize');
require('dotenv').config();
const { sequelize } = require('../database/dbConnect');

class Cat extends Model {}

Cat.init({
  // Cat model attributes

  catID: {                           // the PK of the table
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colour: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chronic_issues: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'userID'
    }
}

}, {
  // Other model options
  sequelize,
  modelName: 'Cat',
  tableName: 'cats'
});

module.exports = Cat;
