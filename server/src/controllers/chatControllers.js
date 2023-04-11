const Chat = require("../models/chatModel");

const fetchChats = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Chat.find({
      $and: [{ senderId: req.user._id }, { recieverId: id }],
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createChats = async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId) {
      res.status(400).json({ message: "UserId has not been sent" });
    }
    const chat = await Chat.create({
      senderId: req.user._id,
      recieverId: userId,
      message,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { fetchChats, createChats };
