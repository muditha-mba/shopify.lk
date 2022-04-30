const mongoose = require("mongoose");
const validator = require("validator");

const UserShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username field cannot be empty!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide Your Email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password should have at least 8 characters"],
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserShema);

module.exports = User;
