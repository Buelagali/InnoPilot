const express = require('express');
const router = express.Router();
const {
  generateIdeas,
  evolveIdea,
  getIdeaVersions,
  restoreIdeaVersion,
  getProjects,
  getProjectById,
  updateProject,
  duplicateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.use(protect);

router.post('/generate', aiLimiter, generateIdeas);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/duplicate', duplicateProject);
router.post('/:id/evolve', aiLimiter, evolveIdea);
router.get('/:id/versions', getIdeaVersions);
router.post('/:id/restore-version/:versionNumber', restoreIdeaVersion);

module.exports = router;
