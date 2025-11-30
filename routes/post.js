const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  createPost,
  addComment,
  toggleLikeOnComment,
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllPosts) 
  .post(protect, createPost); 

router.post('/:id/comment', protect, addComment); 

router.put('/:id/comment/:commentId/like', protect, toggleLikeOnComment); 

module.exports = router;