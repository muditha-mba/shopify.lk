const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

router.route("/").get(verifyTokenAndAdmin, userController.getAllUser);
router.route("/stats").get(verifyTokenAndAdmin, userController.getUserStats);

router
  .route("/:id")
  .get(verifyTokenAndAdmin, userController.getUser)
  .put(verifyTokenAndAuthorization, userController.updateUser)
  .delete(verifyTokenAndAuthorization, userController.deleteUser);

module.exports = router;
