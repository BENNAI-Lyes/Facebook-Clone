const router = require("express").Router();
const Conversation = require("../models/Conversation");

//create a new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    return res.status(200).json(savedConversation);
  } catch (error) {
    console.log(error);
  }
});

//get all user's conversations

router.get("/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(conversations);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
