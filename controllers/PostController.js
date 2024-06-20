const { Post, User } = require("../models/index");
class PostController {
  static async Beranda(req, res) {
    try {
      let data = await User.findAll();
      res.render("home.ejs");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async ShowAddPost(req, res) {
    try {
      res.render("addPost.ejs");
    } catch (error) {
      res.send(error);
    }
  }
  static async AddPost(req, res) {
    try {
      let data = await Post.create(req.body);
      if (data) {
        res.redirect("beranda.ejs");
      } else {
        throw error;
      }
    } catch (error) {
      res.send(error);
    }
  }
}
module.exports = PostController;