const Order = require("../models/orderModel");

exports.createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();

    res.status(200).json({
      status: "success",
      data: {
        order: savedOrder,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      status: "succes",
      data: {
        order: updatedOrder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Order has been deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.id });

    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    orders = await Order.find();

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getMonthlyIncome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const incomeStats = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: { _id: "$month", total: { $sum: "$sales" } },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        incomeStats,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      err,
    });
  }
};
