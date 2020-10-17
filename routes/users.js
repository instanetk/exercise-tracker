const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).send("No registered users");

  res.send(users);
});

module.exports = router;
