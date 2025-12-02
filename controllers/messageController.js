const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const getConversations = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const conversations = await Conversation.find({
    participants: loggedInUserId,
  }).populate('participants', 'nome avatar');
  res.status(200).json(conversations);
});

const getMessagesForConversation = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const otherUserId = req.params.otherUserId;

  const conversation = await Conversation.findOne({
    participants: { $all: [loggedInUserId, otherUserId] },
  }).populate('messages'); 

  if (!conversation) {
    return res.status(200).json([]);
  }
  res.status(200).json(conversation.messages);
});

const sendMessage = asyncHandler(async (req, res) => {
  const { message, receiverId } = req.body;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  await newMessage.save();

  conversation.messages.push(newMessage._id);
  await conversation.save();
  
  const io = req.app.get('io');

  io.to(conversation._id.toString()).emit('receiveMessage', newMessage);

  res.status(201).json(newMessage);
});

module.exports = {
  getConversations,
  getMessagesForConversation,
  sendMessage,
};