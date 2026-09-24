const express = require('express');
const router = express.Router();
const {
  generateRoadmap,
  getRoadmap,
  updateTaskStatus,
} = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.use(protect);

router.get('/:projectId', getRoadmap);
router.post('/:projectId/generate', aiLimiter, generateRoadmap);
router.put('/:projectId/tasks/:taskId', updateTaskStatus);

module.exports = router;
