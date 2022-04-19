const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

//create new post
const createPost = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);
    const { content } = req.body;
    if (!content) {
      res.status(403);
      throw new Error("please add some comment");
    }

    //GETTING IMAGES
    //   let imagesUrl = [];
    //   if (req.files.length) {
    //     req.files.map((file) => {
    //       imagesUrl.push(
    //         `${req.protocol}://${req.get("host")}/public/uploads/${
    //           file.filename
    //         }`
    //       );
    //     });
    //   }

    const newPost = new Post({
      ...req.body,
      // images: imageUrl,
      user: req.user._id,
    });
    console.log(req.user);
    const savedPost = await newPost.save();
    const fullPost = await savedPost.populate("user", "userName profile_pic");
    res.status(200).json({ success: true, fullPost });
  } catch (error) {
    res.status(500);
    throw new Error("server error", error);
  }
});

const allUserPosts = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  try {
    const getPosts = await Post.find({ user: req.user._id }).populate(
      "user",
      "userName profile_pic"
    );
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "user",
    //     model: "user",
    //     select: "username profile_pic",
    //   },
    // })
    // .sort({ createdAt: -1 });
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500);
    throw new Error("server error");
  }
});

// const editPost = async (req, res) => {
//   try {
//     const getPost = await Post.findById(req.params.id);
//     if (!getPost)
//       return res.status(400).json({ message: "something went wrong !!" });
//     // check if this post of user or not
//     if (getPost.user.toString() !== req.user._id.toString()) {
//       return res.status(400).json({ message: "you don`t own this post" });
//     }
//     const newPost = await Post.findOneAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!newPost)
//       return res.status(500).json({ message: "something went wrong !!" });
//     return res
//       .status(200)
//       .json({ data: newPost, message: "updated successfully " });
//   } catch (error) {
//     return res.status(500).json({ message: "somthing went wrong !!" });
//   }
// };

const editPost = asyncHandler(async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.id);
    if (!getPost) {
      res.status(400);
      throw new Error("Something went wrong !!!");
    }

    // check if this post of user or not
    if (getPost.user.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error("Not athorixed");
    }
    const updatedPost = await Post.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      res.status(404);
      throw new Error("Something went wrong");
    }

    res
      .status(200)
      .json({ data: updatedPost, message: "updated successfully " });
  } catch (error) {
    res.status(500);
    throw new Error(" server error");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404);
      throw new Error("Post not found !!!");
    }

    const getPost = await Post.findById(id);
    if (!getPost) {
      res.status(404);
      throw new Error("Post not found");
    }

    if (getPost.user.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error("Not Authorized");
    }

    await Post.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully !!!" });
  } catch (error) {
    res.status(500);
    throw new Error("500 server error");
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // get post
    var getPost = await Post.findById(id);
    if (!getPost) {
      res.status(404);
      throw new Error("Post not found");
    }
    // check if user liked on this post before or not
    if (getPost.like.includes(req.user._id)) {
      getPost = await Post.findByIdAndUpdate(
        id,
        { $pull: { like: req.user._id } },
        { new: true }
      );
    } else {
      getPost = await Post.findByIdAndUpdate(
        id,
        { $push: { like: req.user._id } },
        { new: true }
      );
    }

    const likedPost = await getPost.populate("user", "username profile_pic");
    res.status(200).json(likedPost);
  } catch (error) {
    res.status(500);
    throw new Error("server error");
  }
});

const addComment = asyncHandler(async (req, res) => {
  try {
    const { comment, id } = req.body;
    if (!comment) {
      res.status(403);
      throw new Error("Please add some content");
    }
    //creaete new commnet
    const newComment = new Comment({
      comment,
      user: req.user._id,
      post: id,
    });

    if (!newComment) {
      res.status(500);
      throw new Error("Something went wrong");
    }

    await newComment.save();

    let getPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    if (!getPost) {
      res.status(404);
      throw new Error("Post not found");
    }
    res
      .status(200)
      .json(await newComment.populate("user", "username profile_pic"));
  } catch (error) {
    res.status(500);
    throw new Error("server error");
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getComment = await Comment.findById(id);
    console.log(getComment);
    if (!getComment) {
      res.status(404);
      throw new Error("comment not found");
    }
    //check if this comment belong to signed user or not
    if (getComment.user.toString() === req.user._id.toString()) {
      //remove comment
      const deletedComment = await getComment.remove();
      return res.status(200).json({ message: "comment Delete Successfully" });
    } else {
      res.status(403);
      throw new Error("unAuthorized");
    }
  } catch (error) {
    res.status(500);
    throw new Error("server error");
  }
});

const followingPost = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.findById(req.user._id);
    if (!getUser) {
      res.status(404);
      throw new Error("User not found");
    }

    let posts = await Promise.all(
      getUser.following.map(async (user) => {
        return await Post.find({ user }).populate(
          "user",
          "username profile_pic"
        );
        //  .populate({
        //    path: "comments",
        //    populate: {
        //      path: "user",
        //      model: "user",
        //      select: "username profile_pic",
        //    },
        //  });
      })
    );

    // get signed user posts
    const userPosts = await Post.find({ user: req.user._id }).populate(
      "user",
      "username profile_pic"
    );
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "user",
    //     model: "user",
    //     select: "username profile_pic",
    //   },
    // });
    res
      .status(200)
      .json([...posts.filter((arr) => arr.length !== 0).flat(), ...userPosts]);
  } catch (error) {
    res.status(500);
    throw new Error("server orro");
  }
});

module.exports = {
  createPost,
  allUserPosts,
  deletePost,
  editPost,
  followingPost,
  likePost,
  addComment,
  deleteComment,
};
