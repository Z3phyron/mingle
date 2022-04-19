const jwt = require("jsonwebtoken");
const User = require("../models/user");

const emailController = async (req, res) => {
  const token = req.query.token;
  //   const { token } = req.body;
  //   console.log(req.body);

  if (!token) {
    res.status(404);
    throw new Error("invalid");
  }

  //decode d token
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid token");
  }

  const oldUser = await User.findOne({
    email: decodeToken.email,
  });

  if (!oldUser) {
    return res.status(400);
    throw new Error("User does not exis");
  }

  oldUser.verified = true;

  await oldUser.save();

  res.status(200).json({
    success: true,
    msg: "you're verified succesfully",
  });
};

module.exports = emailController;
