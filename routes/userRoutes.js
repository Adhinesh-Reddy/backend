const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controller/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
