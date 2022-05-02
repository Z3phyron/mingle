const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  // updateUser,
  // deleteUser,
  followUser,
  allUsers,
  getFriends,
  // getFriend,
} = require("../controllers/userControl");

router.get("/", protect, allUsers);
// router.put("/:id", protect, updateUser);
router.put("/followUser", protect, followUser);
// router.put("/:id/unfollow", protect, unfollowUser);

// router.delete("/:id", protect, deleteUser);
router.get("/friends/:userId", protect, getFriends);
// router.get("/:userId/friend/", protect, getFriend);
// router.post("/", getFriends);

module.exports = router;
