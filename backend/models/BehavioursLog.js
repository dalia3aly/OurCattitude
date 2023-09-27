// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../database/dbConnect');
// const FoodLog = require('./FoodLog');  // Import missing
// const Cat = require('./Cat');  // Import missing

// class BehavioursLog extends Model {}

// BehavioursLog.init({
//   logID: {                                      // the PK of the table
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   date: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   foodLogID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'foodlogs',
//       key: 'foodLogID'
//     }
//   },
//   sleeping_hours: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   litter_habits: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   activity_level: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   unusual_behaviours: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   catID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'cats',
//       key: 'catID'
//     }
//   }
// }, {
//   sequelize,
//   modelName: 'BehavioursLog',
//   tableName: 'behaviourslog'
// });

// BehavioursLog.belongsTo(FoodLog, { foreignKey: 'foodLogID' });
// BehavioursLog.belongsTo(Cat, { foreignKey: 'catID' });

// module.exports = BehavioursLog;
