'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Transaction.belongsTo(models.User, {
      //   foreignKey: "userId"
      // })
      // Transaction.belongsTo(models.Room, {
      //   foreignKey: "RoomId"
      // })
      // define association here
    }
  }
  Transaction.init({
    RoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Room",
        key: "id"
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Room",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};