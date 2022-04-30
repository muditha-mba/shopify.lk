const router = require("express").Router();
const cartController = require("../controllers/cartController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../utils/verifyToken");

router
  .route("/")
  .get(verifyTokenAndAdmin, cartController.getAllCarts)
  .post(verifyToken, cartController.createCart);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, cartController.getUserCart)
  .put(verifyTokenAndAuthorization, cartController.updateCart)
  .delete(verifyTokenAndAuthorization, cartController.deleteCart);

module.exports = router;
