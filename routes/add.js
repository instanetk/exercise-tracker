const { DateTime } = require("luxon");
const validateObjectId = require("../middleware/validateObjectId");
const { Exercise, validate } = require("../models/exercise");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", validateObjectId, async (req, res) => {
  if (req.body.date === "") delete req.body.date;
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    const exercise = new Exercise(req.body);
    await exercise.save();

    const user = await User.findById({ _id: req.body.userId });
    if (!user) res.status(404).send("User ID not found");

    const result = {
      _id: user._id,
      username: user.name,
      date: DateTime.fromObject(exercise.date).toLocaleString(
        DateTime.DATE_MED_WITH_WEEKDAY
      ),
      duration: exercise.duration,
      description: exercise.description,
    };

    res.send(result);
  } catch (ex) {
    console.log(ex.message);
    res.status(400).send(ex.message);
  }
});

module.exports = router;
