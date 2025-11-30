const express = require('express');
const router = express.Router();

const {
  getConversations,
  getMessagesForConversation,
  sendMessage,
} = require('../controllers/messageController');

const { protect } = require('../middleware/authMiddleware');

router.get('/conversations', protect, getConversations);

router.get('/:otherUserId', protect, getMessagesForConversation);

router.post('/', protect, sendMessage);

module.exports = router;