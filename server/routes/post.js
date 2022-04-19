const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createPost,
  allUserPosts,
  deletePost,
  editPost,
  followingPost,
  likePost,
  addComment,
  deleteComment,
} = require("../controllers/postControl");;

router.route("/").post(protect, createPost).get(protect, allUserPosts);
router.route("/comment").post(protect, addComment);
router.route("/comment/:id").delete(protect, deleteComment);

router.route("/:id").delete(protect, deletePost).put(protect, editPost);
router.route("/like/:id").put(protect, likePost);
router.route("/feed").get(protect, followingPost);
// router.route("/all")

module.exports = router;
