const User = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username.replaceAll(" ", "-"),
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_ENC_KEY
    ).toString(),
  });

  const { password, ...others } = newUser._doc;

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      status: "success",
      data: {
        user: others,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Wrong credentials!" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_ENC_KEY
    );
    const decodedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (decodedPassword !== req.body.password) {
      return res
        .status(401)
        .json({ status: "fail", message: "Wrong credentials!" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXP_DATE }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({
      status: "success",
      accessToken,
      data: {
        user: others,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};
