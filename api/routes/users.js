const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//update a user
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("user has been updated");
    } else {
      return res.status(403).json("you can update only your account");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("user account has been deleted");
    } else {
      return res.status(403).json("you can delete only your account");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a user
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
    let user;
    if (userId) {
      user = await User.findById(userId);
    }
    if (username) {
      user = await User.findOne({ username });
    }
    if (!user) return res.status(404).json("user not found");
    const { __v, password, ...otherUserProps } = user._doc;
    return res.status(200).json(otherUserProps);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      if (!user)
        return res
          .status(404)
          .json("the user you want to follow does not found");
      const currentUser = await User.findById(req.body.userId);

      if (!currentUser.followings.includes(req.params.id)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        return res.status(200).json("you are following this user");
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//unfollow
router.put("/:id/unfollow", async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      if (!user)
        return res
          .status(404)
          .json("the user you want to follow does not found");
      const currentUser = await User.findById(req.body.userId);

      if (currentUser.followings.includes(req.params.id)) {
        await user.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });
        return res.status(200).json("you are unfollowing this user");
      }
    } else {
      return res.status(403).json("you can not unfollow your self");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a user friends
router.get("/friends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json("user does not found");
    }

    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId))
    );

    const friendLists = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendLists.push({ _id, username, profilePicture });
    });

    return res.status(200).json(friendLists);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
