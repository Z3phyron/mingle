const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControl");
const verifyTokenController = require("../controllers/verifyToken");

router.post("/", registerUser);
router.post("/SignIn", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/verifyToken", verifyTokenController);
router.put("/reset-password", resetPassword);

module.exports = router;
