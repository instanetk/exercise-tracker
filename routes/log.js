const { DateTime } = require("luxon");
const validateObjectId = require("../middleware/validateObjectId");
const { Exercise, validate } = require("../models/exercise");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.query.userId;
  const dateFrom = req.query.from;
  const dateTo = req.query.to;
  const limit = 0 || parseInt(req.query.limit);
  let log;

  const user = await User.findById(id);
  if (!user) return res.status(400).send("No such user.");

  if (!dateFrom && !dateTo) {
    console.log("full query");
    log = await Exercise.find({ userId: id }).limit(limit);
    if (!log) return res.status(404).send("No logs for user.");
  } else {
    let query;
    if (dateFrom && dateTo) {
      console.log("from & to");
      query = {
        $gte: new Date(dateFrom).toISOString(),
        $lte: new Date(dateTo).toISOString(),
      };
    } else if (!dateTo) {
      console.log("from");
      query = { $gte: new Date(dateFrom).toISOString() };
    }

    log = await Exercise.find({
      userId: id,
      date: query,
    }).limit(limit);
  }

  const exercises = log.map((log) => {
    const each = {
      description: log.description,
      duration: log.duration,
      date: new Date(log.date)
        .toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        .replace(/,/g, ""),
    };

    return each;
  });

  const result = {
    _id: user._id,
    username: user.name,
    count: log.length,
    log: exercises,
  };

  res.send(result);
});

module.exports = router;
