'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // A.belongsToMany(models.B, { through: 'conjunction_table' });
      // A.hasMany(models.Conjunction);
      Post.belongsToMany(models.Tag, { through: "PostTags"})
      Post.belongsTo(models.User)
      
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};