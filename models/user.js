const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(name) {
  const schema = Joi.string().min(3).max(255).required();

  return schema.validate(name);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
