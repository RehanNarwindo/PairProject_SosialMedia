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
      // define association here
    }
  }
  Profile.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "is required"},
        notEmpty: {msg: "is required"}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "is required"},
        notEmpty: {msg: "is required"}
      }
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "is required"}
      }
    },
    private_account: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {msg: "is required"},
        notEmpty: {msg: "is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};