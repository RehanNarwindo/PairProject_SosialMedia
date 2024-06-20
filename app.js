const express = require("express");
const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});