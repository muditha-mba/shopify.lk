const Product = require("../models/productModel");

exports.createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();

    res.status(200).json({
      status: "success",
      data: {
        product: savedProduct,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({
        status: "fail",
        message: `No product with this ID ${req.params.id}`,
      });
    }

    res.status(200).json({
      status: "succes",
      data: {
        product: updatedProduct,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Product has been deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err });
  }
};
