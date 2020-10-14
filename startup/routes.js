const bodyParser = require("body-parser");
const user = require("../routes/user");
const add = require("../routes/add");
const express = require("express");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/api/exercise/new-user", user);
  app.use("/api/exercise/add", add);
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });
};
