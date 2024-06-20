'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate : {
        isNull : { msg : "is required"},
        notEmpty: { msg : "is required" }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate : {
        isNull : { msg : "is required"},
        notEmpty: { msg : "is required" }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      len : [8, 12],
      validate : {
        isNull : { msg : "is required"},
        notEmpty: { msg : "is required" }
      }
    },
    phone_number: {
      type : DataTypes.STRING,
      allowNull : false,
      len : [10, 12],
      validate : {
        isNull : { msg : "is required"},
        notEmpty: { msg : "is required" }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const hashedPassword = hashPassword(user.password);

        user.password = hashedPassword;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};