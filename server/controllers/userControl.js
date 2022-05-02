const User = require("../models/user");

const asyncHandler = require("express-async-handler");

// get all users
const allUsers = async (req, res) => {
  try {
    const findUsers = await User.find().select(
      "profile_pic firstName lastName followers"
    );
    if (!findUsers)
      return res.status(500).json({ message: "somthing went wrong !!" });
    //return users without signed user

    const randUsers = findUsers.filter(
      (user) => user._id.toString() !== req.user._id.toString()
    );
    return res
      .status(200)
      .json(
       randUsers
      );
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUser = asyncHandler(async (req, res) => {
  const currentUser = req.params.id;
  if (req.user._id.toString() === currentUser || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(currentUser, {
        $set: req.body,
      });
      res.status(200).json({
        success: true,
        message: "account updated successfully",
      });
    } catch (error) {
      res.status(500);
      throw new Error("server error");
    }
  } else {
    res.status(403);
    throw new Error("you can only update your account");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const currentUser = req.params.id;
  if (req.user._id.toString() === currentUser || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(currentUser);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

const getFriends = asyncHandler(async (req, res) => {
  console.log(req.params.userId);
  try {
    const currentUser = await User.findById(req.user._id.toString());

    console.log(currentUser);
    const friends = await Promise.all(
      currentUser.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, profile_pic } = friend;
      friendList.push({ _id, firstName, lastName, profile_pic });
    });
    res.status(200).json({ success: true, friendList });
  } catch (error) {
    res.status(500);
    throw new Error("server error", error);
  }
});

const followUser = asyncHandler(async (req, res) => {
  // console.log(req.body)
  if (req.user._id.toString() !== req.body.id) {
    try {
      const currentUser = await User.findById(req.user._id.toString());
      const userToBeFollowed = await User.findById(req.body.id);
      if (!userToBeFollowed.followers.includes(req.user._id.toString())) {
        await userToBeFollowed.updateOne({
          $push: { followers: req.user._id.toString() },
        });
        await currentUser.updateOne({
          $push: { following: req.body.id },
        });
        //  const friends = await currentUser.following;
        //  console.log(friends);
        res.status(200).json("user has been followed");
      } else if (
        userToBeFollowed.followers.includes(req.user._id.toString())
      ) {
        await userToBeFollowed.updateOne({
          $pull: { following: req.user._id.toString() },
        });
        await currentUser.updateOne({
          $pull: { followers: req.body.id },
        });

        
        res.status(200).json("user has been unfollowed");
      }
    } catch (error) {
      res.status(403);
      throw new Error(error);
    }
  } else {
    res.status(403);
    throw new Error("you cant follow urself dummy!!");
  }
});

// const unfollowUser = asyncHandler(async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const currentUser = await User.findById(req.body.userId);
//       const userToBeFollowed = await User.findById(req.params.id);
//       if (!userToBeFollowed.followers.includes(req.body.userId)) {
//         await userToBeFollowed.updateOne({
//           $pull: { following: req.body.userId },
//         });
//         await currentUser.updateOne({
//           $pull: { followers: req.params.id },
//         });
//         res.status(200).json("user has been unfollowed");
//       } else {
//         res.status(403);
//         throw new Error("you are already unfollowing this user");
//       }
//     } catch (error) {
//       res.status(403);
//       throw new Error(error);
//     }
//   } else {
//     res.status(403);
//     throw new Error("you cant unfollow urself dummy!!");
//   }
// });

const getFriend = asyncHandler(async (req, res) => {
  // console.log(req.params.userId);
  try {
    const currentUser = await User.findById(req.user._id.toString());
    const friendId = await User.findById(req.params.id);

    // console.log(currentUser);
    // console.log(friendId);

    if (currentUser !== friendId) {
      const friend = await currentUser.following.populate(
        "user",
        "userName profile_pic"
      );
      console.log(friend);
    }

    res.status(200).json({ success: true, friend });
  } catch (error) {
    res.status(500);
    throw new Error("server error", error);
  }
});

module.exports = {
  updateUser,
  deleteUser,
  followUser,
  allUsers,
  getFriends,
  getFriend,
};
