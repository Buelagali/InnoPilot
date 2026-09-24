const express = require('express');
const router = express.Router();
const { assistantChat, getAssistantHistory } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.use(protect);

router.post('/assistant/chat', aiLimiter, assistantChat);
router.get('/assistant/history', getAssistantHistory);

module.exports = router;
