const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Post = require('../models/Post');


const getUserProfile = asyncHandler(async (req, res) => {
  
  const user = req.user;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('Usuário não encontrado');
  }
});


const getUserPosts = asyncHandler(async (req, res) => {
  
  const userId = req.user._id;

  
  const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

  res.status(200).json(posts);
});

module.exports = {
  getUserProfile,
  getUserPosts,
};