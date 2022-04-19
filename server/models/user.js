const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "Please add a name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a name"],
    },
    profile_pic: {
      type: String,
      required: true,
      default: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    },
    cover_pic: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 200,
    },
    DOB: {
      type: Date,
    },
    liveAt: { type: String, default: "" },
    relationship: { type: String, default: "" },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
