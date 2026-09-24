const express = require('express');
const router = express.Router();
const {
  discoverChat,
  finalizeDiscovery,
  analyzeManualProblem,
  getProblems,
  getProblemById,
  deleteProblem,
} = require('../controllers/problemController');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.use(protect);

router.post('/discover/chat', aiLimiter, discoverChat);
router.post('/discover/finalize', aiLimiter, finalizeDiscovery);
router.post('/analyze-manual', aiLimiter, analyzeManualProblem);
router.get('/', getProblems);
router.get('/:id', getProblemById);
router.delete('/:id', deleteProblem);

module.exports = router;
