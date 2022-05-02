const express = require("express");
const router = express.Router();

const verifyMail = require("../controllers/emailController");

router.post("/verifyEmail", verifyMail);

module.exports = router;
