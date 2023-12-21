'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
const Helper = require('../helpers/helper');
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
      // User.hasMany(models.Transaction, {
      //   foreignKey: "UserId"
      // })

      // User.belongsTo(models.Profile)
      User.hasMany(models.Profile, {
        foreignKey: "UserId"
    })
    }
    get balanceRupiahFormat() {
      return Helper.currencyFormat(this.balance);
  }

  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
          notEmpty: {
              msg: 'Please enter your Email'
          },
          isEmail: true
      }
  },
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate:{
    //     notEmpty: {
    //       msg: 'Please Enter Your Username'
    //     }
    //   }
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
            msg: 'Please enter your Password'
        },
        validatePasswordMin(value) {
            if (value.length < 8) {
                throw "Minimum Length Password is 8";
            }
        }
    }
    },
    role: {
      type: DataTypes.INTEGER,
    },
  //   balance: {
  //     type: DataTypes.INTEGER
  // }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    user.password = Helper.generatePassword(user.password);
    // user.role = 2;
    // user.balance = 0;
});

  return User;
};