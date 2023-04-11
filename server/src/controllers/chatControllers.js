const Chat = require("../models/chatModel");

const fetchChats = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Chat.find({
      $and: [
        { $or: [{ senderId: req.user._id }, { senderId: id }] },
        { $or: [{ recieverId: req.user._id }, { recieverId: id }] },
      ],
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createChats = async (req) => {
  try {
    const { to, message, from } = req;
    const chat = await Chat.create({
      senderId: from,
      recieverId: to,
      message,
    });
    await chat.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fetchChats, createChats };
