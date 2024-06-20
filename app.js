const express = require("express");
const app = express();
const index = require("./routes/index");
const port = 3001;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(
  session({
    secret: "rahasia xixi", // wajib
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);
app.use("/", index);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
