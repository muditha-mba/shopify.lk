const Cart = require("../models/cartModel");

exports.createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();

    res.status(200).json({
      status: "success",
      data: {
        cart: savedCart,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      status: "succes",
      data: {
        cart: updatedCart,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Cart items has been deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getAllCarts = async (req, res, next) => {
  try {
    carts = await Cart.find();

    res.status(200).json({
      status: "success",
      results: carts.length,
      data: {
        carts,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};
