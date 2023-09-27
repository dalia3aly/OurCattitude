const { Model, DataTypes } = require('sequelize');
require('dotenv').config();
const { sequelize } = require('../database/dbConnect');

const Cats = require('../models/Cat')

class DailyLogs extends Model {}

DailyLogs.init({
  logID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  catID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cats',        // name of the referenced table
      key: 'catID'
    }
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ActivityLevel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  SleepingHours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  LitterHabits: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  UnusualBehaviours: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  foodData: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'DailyLogs',
  tableName: 'DailyLogs', // make sure this matches exactly what you named your table
  timestamps: true
});

// model for the 'cats' table already defined

DailyLogs.belongsTo(Cats, { foreignKey: 'catID' });

module.exports = DailyLogs;
