const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const name = req.body.username;
  const { error } = validate(name);
  if (error) res.status(400).send(error.details[0].message);

  const user = new User({ name });
  await user.save();

  res.json({ username: user.name, _id: user._id });
});

module.exports = router;
