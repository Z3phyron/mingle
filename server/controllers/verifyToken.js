const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res) => {
  // res.send(req.query.token)
  const token = req.query.token;
    // const { token } = req.body;
    // console.log(req.body);

  if (!token) {
    return res.status(404).json({
      success: false,
      msg: "invalid Token",
    });
  }

  //decode d token
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "invalid 2 Token",
      error: err,
    });
  }

  const oldUser = await User.findOne({
    email: decodeToken.email,
  });

  if (!oldUser) {
    return res.status(400).json({
      success: false,
      msg: "User not found",
      //  error: err,
    });
  }

  res.status(200).json({
    success: true,
    data: decodeToken.email,
  });
};

module.exports = verifyToken;
