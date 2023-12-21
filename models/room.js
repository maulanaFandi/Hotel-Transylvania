'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    
    // get rupiah() {
    //   return rupiah.formatCurrency(this.price);
    // }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Room.hasMany(models.Transaction)

      Room.belongsTo(models.Status)
      
      Room.belongsToMany(models.Room, {
        through: "transaction",
        foreignKey: "RoomId",
        as: "IdRoom"
      })

      // define association here
    }
  }
  Room.init({
    roomNumber: {
      type: DataTypes.INTEGER,
      unique : true
    },
    price: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT,
    roomType: DataTypes.STRING,
    StatusId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};