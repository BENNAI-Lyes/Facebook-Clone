const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json("post has been created");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json("post not found");
  if (req.body.userId === post.userId) {
    try {
      await post.update({ $set: req.body });
      return res.status(200).json("post has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can update only your posts");
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json("post not found");
  if (req.body.userId === post.userId || req.body.isAdmin) {
    try {
      await post.remove();
      return res.status(200).json("post has been removed");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can remove only your posts");
  }
});

//like/deslike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("post not found");
    if (!post.likes.includes(req.body.userId)) {
      await post.update({ $push: { likes: req.body.userId } });
      return res.status(200).json("post liked");
    } else {
      await post.update({ $pull: { likes: req.body.userId } });
      return res.status(200).json("post disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("post not found");
    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a all user's posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json("user does not found");
    const userPosts = await Post.find({ userId: user._id });

    return res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json("user does not found");
    const userPosts = await Post.find({ userId: user._id });

    const friendsPosts = await Promise.all(
      user.followings.map((friendId) => Post.find({ userId: friendId }))
    );

    return res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
