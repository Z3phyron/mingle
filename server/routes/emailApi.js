const express = require("express");
const router = express.Router();

const verifyMail = require("../controllers/emailController");

router.post("/verify", verifyMail);

module.exports = router;
