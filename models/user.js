'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsToMany(models.Room, {
      //   through: "transaction",
      //   foreignKey: "UserId",
      //   as: "IdUser"
      // })
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Please Enter Your Username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Please Enter Your Password'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Role Cannot Be Null'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(instance,option){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password=hash
      },
      afterCreate(instance,option){}
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};