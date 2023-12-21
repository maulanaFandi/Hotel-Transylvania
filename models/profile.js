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
      Profile.belongsTo(models.User, {
        foreignKey: "UserId"
    })
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
    UserProfileId: {
      type: DataTypes.INTEGER
    }

    
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};