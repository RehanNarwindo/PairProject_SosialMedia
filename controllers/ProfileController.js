const bcrypt = require("bcryptjs");
const { User, Post } = require("../models");

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
}

module.exports = ProfileController;
