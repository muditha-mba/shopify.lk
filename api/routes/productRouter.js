const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../utils/verifyToken");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(verifyTokenAndAdmin, productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .put(verifyTokenAndAdmin, productController.updateProduct)
  .delete(verifyTokenAndAdmin, productController.deleteProduct);

module.exports = router;
