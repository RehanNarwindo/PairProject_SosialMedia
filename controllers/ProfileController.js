const bcrypt = require("bcryptjs");
const { User, Post, PostTag } = require("../models");
const { where } = require("sequelize");

class ProfileController {
  static async profile(req, res) {
    try {
      const id = req.session.userId;
      const data = await User.findAll({
        where: { id: id },
        include: Post,
      });
      // console.log(req.session);
      res.render("../views/Dashboard/index_profile.ejs", { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async editProfile(req, res) {
    try {
      const id = req.session.userId;
      let data = Profile.findAll({
        where: {
          UserId: id,
        },
      });
      res.render("editprofile.ejs", { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async postEditProfile(req, res) {
    try {
      const id = req.session.userId;
      const { first_name, last_name, profile_picture } = req.body;
      await Profile.update(
        {
          first_name: first_name,
          last_name: last_name,
          profile_picture: profile_picture,
        },
        {
          where: {
            UserId: id,
          },
        }
      );
    } catch (error) {
      res.send(error);
    }
  }
  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      await PostTag.destroy({
        where: {
          PostId: +id,
        },
      });
      await Post.destroy({
        where: {
          id: +id,
        },
      });
      res.redirect("/profile");
    } catch (error) {
      res.send(error);
    }
  }

  static async editPost(req, res) {
    try {
      let { id } = req.params;
      let { title, content, imgUrl } = req.body;
      await Post.update({ title, content, imgUrl }, { where: { id: +id } });
      res.redirect("/profile");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ProfileController;
