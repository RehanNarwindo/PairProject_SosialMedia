const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");
const ProfileController = require("../controllers/ProfileController");

router.use((req, res, next) => {
  if (req.session.role !== "admin") {
    res.send(`lu bukan admin`);
  } else {
    next();
  }
});
router.get("/dashboard", (req, res) => {
  res.send("halaman admin");
});

module.exports = router;
