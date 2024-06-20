const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");
//home
router.get("/", UserController.landingPage);
// register
router.get("/register", UserController.registerForm);
router.post("/register", UserController.postRegister);

router.get("/login", UserController.loginForm);
router.post("/login", UserController.postloginForm);

router.use((req, res, next) => {
  //   console.log(req.session, "ini req.sesion");
  //   console.log("Time:", Date.now());
  const error = "Please login";
  if (!req.session.userId) {
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});
router.get("/home", UserController.Home);

// beranda
router.get("/beranda", PostController.Beranda);

router.get("/beranda/addPost", PostController.ShowAddPost);
router.post("/beranda/addPost", PostController.AddPost);

//User Profile

// logout
router.get("/logout", UserController.Logout);

module.exports = router;