const Joi = require("joi");
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

function validateExercise(exercise) {
  const schema = Joi.object({
    userId: Joi.objectId(),
    description: Joi.string().min(3).max(255).required(),
    duration: Joi.number().min(1).max(120).required(),
    date: Joi.date().optional(),
  });
  return schema.validate(exercise);
}

exports.Exercise = Exercise;
exports.validate = validateExercise;
