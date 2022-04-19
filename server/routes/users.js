const express = require("express");
const router = express.Router();

const {
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getFriends,
  getFriend,
} = require("../controllers/userControl");

router.put("/:id", updateUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.delete("/:id", deleteUser);
router.get("/:userId/friends", getFriends);
router.get("/:userId/friends/", getFriend);
// router.post("/", getFriends);

module.exports = router;
