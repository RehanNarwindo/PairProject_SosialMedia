const { Op } = require("sequelize");
const { Post, User, Tag } = require("../models/index");
const bcrypt = require("bcryptjs");
const tag = require("../models/tag");
class PostController {
  static async Beranda(req, res) {
    try {
      const { tags, search } = req.query;
      console.log(req.query);
      let data;

      if (tags) {
        data = await Post.findAll({
          include: [
            {
              model: Tag,
              where: {
                name: tags,
              },
            },
            {
              model: User,
            },
          ],
          order: [["createdAt", "DESC"]],
        });
      } else if (search) {
        data = await Post.findAll({
          include: [Tag, User],
          where: {
            title: { [Op.iLike]: `%${search}%` },
          },
          order: [["createdAt", "DESC"]],
        });
      } else {
        data = await Post.findAll({
          include: [Tag, User],
          order: [["createdAt", "DESC"]],
        });
      }

      res.render("../views/Dashboard/index_user.ejs", { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async ShowAddPost(req, res) {
    try {
      res.render("../views/Dashboard/formAddPost.ejs");
    } catch (error) {
      res.send(error);
    }
  }
  static async AddPost(req, res) {
    try {
      const { title, content, imgUrl, tags } = req.body;
      let UserId = req.session.userId;
      let data = await Post.create({ title, content, imgUrl, UserId });
      const [tag, created] = await Tag.findOrCreate({ where: { name: tags } });

      await data.addTags(tag);

      if (data) {
        res.redirect("/beranda");
      } else {
        throw error;
      }
    } catch (error) {
      res.send(error);
    }
  }
}
module.exports = PostController;
