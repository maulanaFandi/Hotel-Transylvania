'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   Profile.belongsTo(models.User, {
    //     foreignKey: "UserId"
    // })
    Profile.belongsTo(models.User)
      // define association here
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Please Enter Your Name'
        }
      }
    },
    age: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Please Enter Your Address'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Please Enter Your Phone Number'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }

    }

    
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};