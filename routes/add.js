const validateObjectId = require("../middleware/validateObjectId");
const { Exercise, validate } = require("../models/exercise");
const express = require("express");
const router = express.Router();

router.post("/", validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    let exercise = new Exercise(req.body);
    exercise = await exercise.save();

    res.send(exercise);
  } catch (ex) {
    console.log(ex.message);
    res.status(400).send(ex.message);
  }
});

module.exports = router;
