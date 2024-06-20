const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
class UserController {
  static async landingPage(req, res) {
    try {
      res.render("../views/landingPage.ejs");
    } catch (error) {
      res.send(error);
    }
  }
  static async registerForm(req, res) {
    try {
      res.render("../views/Dashboard/index_register.ejs");
    } catch (error) {
      res.send(error);
    }
  }
  static async postRegister(req, res) {
    try {
      let data = await User.findAll();
      console.log(data);
      console.log(req.body);
      // const {username, phone_number, email, password, role } = req.body;
      await User.create(req.body);
      // res.send(req.body)
      res.redirect("/login");
    } catch (error) {
      res.send(error.message);
    }
  }
  static async loginForm(req, res) {
    try {
      req.session.destroy((error) => {
        if (error) {
          return res.send(error);
        } else {
          const { error } = req.query;
          res.render("../views/Dashboard/index_login.ejs", { error });
        }
      });
    } catch (error) {
      res.send(error);
    }
  }
  static async postloginForm(req, res) {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({
        where: {
          username,
        },
      });
      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          // berhasil login
          req.session.userId = user.id;
          req.session.username = user.username;
          return res.redirect("/home");
        } else {
          const error = "invalid username or password";
          return res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = "invalid username or password";
        return res.redirect(`/login?error=${error}`);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async Home(req, res) {
    try {
      res.render("../views/Dashboard/index_alluser.ejs");
    } catch (error) {
      res.send(error);
    }
  }
  static async Logout(req, res) {
    try {
      req.session.destroy((error) => {
        if (error) {
          return res.send(error);
        } else {
          res.redirect("/");
        }
      });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;