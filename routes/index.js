const express = require("express");
const router = express.Router();
const routerAdmin = require("./admin");
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");
const ProfileController = require("../controllers/ProfileController");
//profile
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
router.use("/admin", routerAdmin);
router.get("/profile", ProfileController.profile);
// edit profile
router.get("/profile/edit", ProfileController.editProfile);
router.post("/profile/edit", ProfileController.postEditProfile);
router.get("/beranda", PostController.Beranda);

// delete profile
router.get("/profile/delete/:id", ProfileController.deletePost);

// beranda
router.get("/beranda/addPost", PostController.ShowAddPost);
router.post("/beranda/addPost", PostController.AddPost);

//User Profile

// logout
router.get("/logout", UserController.Logout);

module.exports = router;
