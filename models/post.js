"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsToMany(models.Tag, { through: "PostTags" });
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
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
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
