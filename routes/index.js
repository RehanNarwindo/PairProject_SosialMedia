const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController")
//home
router.get("/", (req, res)=> {
    res.render("landing_page.ejs")
});
// register
router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)

router.get("/login", (req, res)=> {
    res.render("login.ejs")
});
router.post("/login", (req, res)=> {
    res.render("login.ejs")
});

router.get("/")
module.exports = router;
