const { where } = require("sequelize");
const { User, Profile } = require("../models/index");
const bcrypt = require("bcryptjs");
const sendEmail = require("../helpers/emailService");
class UserController {
  static async landingPage(req, res) {
    try {
      res.render("landing_page.ejs");
    } catch (error) {
      res.send(error);
    }
  }
  static async registerForm(req, res) {
    try {
      res.render("register.ejs");
    } catch (error) {
      res.send(error);
    }
  }
  static async postRegister(req, res) {
    try {
      let data = await User.findAll();
      //   console.log(req.body);
      const {
        username,
        phone_number,
        email,
        password,
        role,
        first_name,
        last_name,
        profile_picture,
      } = req.body;

      let private_account = false;
      let saveUser = await User.create({
        username,
        phone_number,
        email,
        password,
        role,
      });

      await Profile.create({
        first_name,
        last_name,
        profile_picture,
        UserId: saveUser.id,
        private_account,
      });
      // res.send(req.body)
      sendEmail({
        to: saveUser.email,
        subject: "Selamat Bergabung Di Desaku",
        text: "Anda Berhasil Membuat Akun",
        html: "<p></p>",
      });
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
          res.render("login.ejs", { error });
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
          req.session.role = user.role;
          if (user.role === "admin") {
            return res.redirect("/admin/dashboard");
          }
          return res.redirect("/profile");
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
