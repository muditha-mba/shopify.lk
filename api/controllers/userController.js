const User = require("../models/userModel");
const CryptoJS = require("crypto-js");

exports.updateUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_ENC_KEY
    ).toString();
  }

  if (req.body.username) {
    req.body.username = req.body.username.replaceAll(" ", "-");
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      status: "succes",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "User has been deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json({
      status: "success",
      data: {
        user: others,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const query = req.query.new;

    let users;

    if (query) {
      users = await User.find().sort({ _id: -1 }).limit(5);
    } else {
      users = await User.find();
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        userStats: data,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};
