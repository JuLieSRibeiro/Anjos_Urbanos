const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User'); 


const getAllPosts = asyncHandler(async (req, res) => {
  
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
});


const createPost = asyncHandler(async (req, res) => {
 
  const { type, mensagem, tags } = req.body;

  if (!type || !mensagem) {
    res.status(400);
    throw new Error('Tipo e mensagem são obrigatórios');
  }

  
  const user = req.user;

  
  const post = await Post.create({
    type,
    mensagem,
    tags,
    user: user._id, 
    nome: user.nome, 
    avatar: user.avatar, 
    cidade: user.cidade, 
  });

  res.status(201).json(post); 
});


const addComment = asyncHandler(async (req, res) => {
  
  const postId = req.params.id;
  
  const { text } = req.body;
  
  const user = req.user;

  if (!text) {
    res.status(400);
    throw new Error('O texto do comentário não pode estar vazio');
  }

  
  const post = await Post.findById(postId);

  if (post) {
    
    const newComment = {
      text: text,
      user: user._id,
      nome: user.nome,
      avatar: user.avatar,
    };

    
    post.comments.unshift(newComment);

    
    await post.save();

    
    res.status(201).json(post);
  } else {
    res.status(404);
    throw new Error('Post não encontrado');
  }
});


const toggleLikeOnComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error('Post não encontrado');
  }

  
  const comment = post.comments.id(commentId);

  if (!comment) {
    res.status(404);
    throw new Error('Comentário não encontrado');
  }

 
  const likeIndex = comment.likes.findIndex(
    (like) => like.user.toString() === userId.toString()
  );

  if (likeIndex > -1) {
    
    comment.likes.splice(likeIndex, 1);
  } else {
    
    comment.likes.push({ user: userId });
  }

  
  await post.save();
  res.status(200).json(post);
});

module.exports = {
  getAllPosts,
  createPost,
  addComment,
  toggleLikeOnComment,
};