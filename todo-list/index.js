const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.get("/files/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", {
        filename: req.params.filename,
        filedata: filedata,
      });
    },
  );
});

app.get("/edit/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("edit", { filename: req.params.filename, data: filedata });
    },
  );
});

app.post("/edit", function (req, res) {
  const oldPath = `./files/${req.body.previous}`;
  const newPath = `./files/${req.body.new}.txt`;
  fs.writeFile(oldPath, req.body.content, "utf-8", function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating file content");
    }
  });

  fs.rename(oldPath, newPath, function (err) {
    res.redirect("/");
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      if (err) {
        console.log(err);
      }
    },
  );
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("listening at port 3000");
});
