const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const mailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const tokenGenerator = require("../config/createToken");
const { verificationEmail, recorveryEmail } = require("../config/sendMail");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.hostname);

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  } else if (!mailRegex.test(email)) {
    res.status(400);
    throw new Error("Please please enter a valid emmail....");
  } else if (password.length < 6) {
    res.status(400);
    throw new Error("password should be atleats 6 char long");
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    res.status(403);
    throw new Error("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // generate token for user
  // console.log("token", tokenGenerator({ email: newUser.email}))
  const token = tokenGenerator({ email: newUser.email });

  // SEND VERIFICATION EMAIL
  const link = `http://${req.hostname}:3000/verifyEmail?token=${token}`;
  console.log(link);
  const sendMail = await verificationEmail(newUser.email, link);

  // SENDING THE MAIL
  if (sendMail) {
    res.status(201).json({
      success: true,
      user: newUser,
      msg: "Error sending mail",
    });
  } else {
    const loggedInUser = await User.findOne({ email });
    const token = tokenGenerator({
      loggedInUser,
    });
    const user = await User.findById(loggedInUser._id).select("-password");
    res
      .status(201)
      .json({ success: true, token, user: user, msg: "saved successfully" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fileds");
  }

  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    res.status(400);
    throw new Error("User does not exist");
  } else {
    const comparePassword = await bcrypt.compare(password, oldUser.password);
    if (!comparePassword) {
      res.status(400);
      throw new Error("Invalid Password");
    }
  }

  const loggedInUser = await User.findById(oldUser._id).select("-password");
  console.log(loggedInUser);

  const token = tokenGenerator({
    loggedInUser,
  });

  const user = await User.findById(oldUser._id).select("-password");

  res.status(201).json({ success: true, token, user: user });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("please fill in all fields");
  } else if (!mailRegex.test(email)) {
    res.status(400);
    throw new Error("invalid email");
  }

  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    res.status(400);
    throw new Error("User not found");
  }

  // generate token for user
  // console.log("token", tokenGenerator({ email: newUser.email}))
  const token = tokenGenerator({ email: oldUser.email });

  // SEND VERIFICATION EMAIL
  const link = `http://${req.hostname}:3000/reset-password?token=${token}`;
  console.log(link);
  const sendMail = await recorveryEmail(oldUser.email, link);

  // SENDING THE MAIL
  if (sendMail) {
    res.status(201).json({
      success: true,
      user: oldUser,
      msg: "Error sending mail",
    });
  } else {
    res
      .status(201)
      .json({ success: true, token, user: oldUser, msg: "sent successfully" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("please fill in all fields");
  } else if (!mailRegex.test(email)) {
    res.status(400);
    throw new Error("invalid email");
  }

  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    return res.status(400);
    throw new Error("User with this email not found");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const changedPassword = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  if (changedPassword) {
    const user = await User.findById(oldUser._id).select("-password");
    res.status(200).json({
      success: true,
      user: user,
      msg: "Reset Successful",
    });
  } else {
    res.status(500);
    throw new Error("something went wrong");
  }
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
