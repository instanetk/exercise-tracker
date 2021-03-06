const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const user = require("../routes/user");
const users = require("../routes/users");
const add = require("../routes/add");
const log = require("../routes/log");
const express = require("express");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static("public"));
  app.use("/api/exercise/new-user", user);
  app.use("/api/exercise/add", add);
  app.use("/api/exercise/log", log);
  app.use("/api/exercise/users", users);
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../views/index.html"));
  });
};
