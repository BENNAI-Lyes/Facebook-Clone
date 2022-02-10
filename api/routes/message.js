const router = require("express").Router();
const Message = require("../models/Message");

//create a new message
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    console.log(error);
  }
});

//get all conversation messages
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
