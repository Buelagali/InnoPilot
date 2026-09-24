const express = require('express');
const router = express.Router();
const {
  analyzeSimilarity,
  analyzeFeasibility,
  analyzeResearchGap,
  analyzeArchitecture,
  generateProposal,
  getProjectAnalyses,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.use(protect);

router.get('/:projectId', getProjectAnalyses);
router.post('/:projectId/similarity', aiLimiter, analyzeSimilarity);
router.post('/:projectId/feasibility', aiLimiter, analyzeFeasibility);
router.post('/:projectId/research-gap', aiLimiter, analyzeResearchGap);
router.post('/:projectId/architecture', aiLimiter, analyzeArchitecture);
router.post('/:projectId/proposal', aiLimiter, generateProposal);

module.exports = router;
