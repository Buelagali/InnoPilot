const Roadmap = require('../models/Roadmap');
const ProjectIdea = require('../models/ProjectIdea');
const aiService = require('../services/ai/AIService');

// @desc    Generate or retrieve Roadmap for a project (Module 10)
// @route   POST /api/roadmaps/:projectId/generate
// @access  Private
exports.generateRoadmap = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOne({ _id: req.params.projectId, userId: req.user.id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const roadmapData = await aiService.generateRoadmap(project, req.user);

    let roadmap = await Roadmap.findOne({ ideaId: project._id, userId: req.user.id });
    if (roadmap) {
      roadmap.phases = roadmapData.phases;
      roadmap.totalEstimatedWeeks = roadmapData.totalEstimatedWeeks || 16;
      roadmap.calculateProgress();
      await roadmap.save();
    } else {
      roadmap = await Roadmap.create({
        ideaId: project._id,
        userId: req.user.id,
        totalEstimatedWeeks: roadmapData.totalEstimatedWeeks || 16,
        phases: roadmapData.phases,
        progressPercentage: 0,
      });
    }

    res.status(200).json({
      success: true,
      message: '10-Phase Roadmap generated successfully.',
      roadmap,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current project roadmap
// @route   GET /api/roadmaps/:projectId
// @access  Private
exports.getRoadmap = async (req, res, next) => {
  try {
    let roadmap = await Roadmap.findOne({ ideaId: req.params.projectId, userId: req.user.id });
    
    // Auto-generate if not exists yet
    if (!roadmap) {
      const project = await ProjectIdea.findOne({ _id: req.params.projectId, userId: req.user.id });
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project idea not found.',
          errorCode: 'IDEA_NOT_FOUND',
        });
      }

      const roadmapData = await aiService.generateRoadmap(project, req.user);
      roadmap = await Roadmap.create({
        ideaId: project._id,
        userId: req.user.id,
        totalEstimatedWeeks: roadmapData.totalEstimatedWeeks || 16,
        phases: roadmapData.phases,
        progressPercentage: 0,
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle or update status of a task in the roadmap
// @route   PUT /api/roadmaps/:projectId/tasks/:taskId
// @access  Private
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { projectId, taskId } = req.params;

    if (!['not_started', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task status. Must be not_started, in_progress, or completed.',
        errorCode: 'INVALID_STATUS',
      });
    }

    const roadmap = await Roadmap.findOne({ ideaId: projectId, userId: req.user.id });
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: 'Roadmap not found.',
        errorCode: 'ROADMAP_NOT_FOUND',
      });
    }

    let taskFound = false;
    for (const phase of roadmap.phases) {
      const task = phase.tasks.id(taskId);
      if (task) {
        task.status = status;
        taskFound = true;
        break;
      }
    }

    if (!taskFound) {
      return res.status(404).json({
        success: false,
        message: 'Task not found in roadmap.',
        errorCode: 'TASK_NOT_FOUND',
      });
    }

    roadmap.calculateProgress();
    await roadmap.save();

    res.status(200).json({
      success: true,
      message: 'Task status updated.',
      progressPercentage: roadmap.progressPercentage,
      roadmap,
    });
  } catch (err) {
    next(err);
  }
};
