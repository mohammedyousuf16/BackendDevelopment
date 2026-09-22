const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/create", async (req, res) => {
  const Createduser = await userModel.create({
    name: "yousufa",
    username: "mdyousufa",
    email: "yousufa@gamil.com",
  });
  res.send(Createduser);
});

app.get("/read", async (req, res) => {
  const users = await userModel.find({ username: "mdyousuf" });
  res.send(users);
});

app.get("/update", async (req, res) => {
  const Updateuser = await userModel.findOneAndUpdate(
    { username: "mdyousuf" },
    { email: "mdyousuf1@yahoo.com" },
    { new: true },
  );
  res.send(Updateuser);
});

app.get("/delete", async (req, res) => {
  const user = await userModel.findOneAndDelete({ username: "mdyousufa" });
  res.send(user);
});

app.listen(3000, () => {
  console.log("listening in port 3000");
});
