const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/create", async (req, res) => {
  const Createduser = await userModel.create({
    name: "yousuf",
    username: "mdyousuf",
    email: "yousufmd1@gamil.com",
  });
  res.send(Createduser);
});

app.listen(3000, () => {
  console.log("listening in port 3000");
});
