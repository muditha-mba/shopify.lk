const router = require("express").Router();
const orderController = require("../controllers/orderController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../utils/verifyToken");

router
  .route("/")
  .get(verifyTokenAndAdmin, orderController.getAllOrders)
  .post(verifyToken, orderController.createOrder);
router
  .route("/income")
  .get(verifyTokenAndAdmin, orderController.getMonthlyIncome);

router
  .route("/:id")
  .get(verifyTokenAndAuthorization, orderController.getUserOrders)
  .put(verifyTokenAndAdmin, orderController.updateOrder)
  .delete(verifyTokenAndAdmin, orderController.deleteOrder);

module.exports = router;
