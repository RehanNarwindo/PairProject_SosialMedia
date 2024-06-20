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
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate:{
        notEmpty:{
          msg:"username harus di isi"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate:{
        notEmpty:{
          msg:"email harus di isi"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      len : [8, 12],validate:{
        notEmpty:{
          msg:"password harus di isi"
        }
      }
    },
    phone_number: {
      type : DataTypes.STRING,
      allowNull : false,
      len : [10, 12],
      validate:{
        notEmpty:{
          msg:"phone number harus di isi"
        }
      }
    }, role: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        // console.log(user, "<< ini di decryp")
        // user.password = "mode_secure"
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};