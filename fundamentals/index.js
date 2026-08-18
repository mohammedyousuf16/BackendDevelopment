const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/:username", (req, res) => {
  user = req.params.username;
  res.send(`Its working ${user}`);
});

app.get("/profile/:username/:age", (req, res) => {
  user = req.params.username;
  age = req.params.age;
  res.send(`Its working ${user} of age ${age}`);
});

app.listen(3000, function () {
  console.log("its listning in port 3000");
});
