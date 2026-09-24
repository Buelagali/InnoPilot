const Analysis = require('../models/Analysis');
const ProjectIdea = require('../models/ProjectIdea');
const aiService = require('../services/ai/AIService');

// @desc    Run and retrieve Similarity Analysis (Module 6)
// @route   POST /api/analysis/:projectId/similarity
// @access  Private
exports.analyzeSimilarity = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOne({ _id: req.params.projectId, userId: req.user.id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    // Retrieve other user's projects or baseline projects for context
    const otherProjects = await ProjectIdea.find({ _id: { $ne: project._id } }).select('title problemAddressed techStack').limit(10);

    const result = await aiService.analyzeSimilarity(project, otherProjects);

    const analysis = await Analysis.findOneAndUpdate(
      { ideaId: project._id, userId: req.user.id, type: 'similarity' },
      {
        ideaId: project._id,
        userId: req.user.id,
        type: 'similarity',
        result,
        versionAnalyzed: project.currentVersion || 1,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Similarity analysis completed.',
      analysis: result,
      recordId: analysis._id,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Run and retrieve Feasibility Analysis (Module 7)
// @route   POST /api/analysis/:projectId/feasibility
// @access  Private
exports.analyzeFeasibility = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOne({ _id: req.params.projectId, userId: req.user.id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const result = await aiService.analyzeFeasibility(project, req.user);

    const analysis = await Analysis.findOneAndUpdate(
      { ideaId: project._id, userId: req.user.id, type: 'feasibility' },
      {
        ideaId: project._id,
        userId: req.user.id,
        type: 'feasibility',
        result,
        versionAnalyzed: project.currentVersion || 1,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Feasibility analysis completed.',
      analysis: result,
      recordId: analysis._id,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Run and retrieve Research Gap Finder (Module 8)
// @route   POST /api/analysis/:projectId/research-gap
// @access  Private
exports.analyzeResearchGap = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOne({ _id: req.params.projectId, userId: req.user.id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const result = await aiService.findResearchGap(project);

    const analysis = await Analysis.findOneAndUpdate(
      { ideaId: project._id, userId: req.user.id, type: 'research_gap' },
      {
        ideaId: project._id,
        userId: req.user.id,
        type: 'research_gap',
        result,
        versionAnalyzed: project.currentVersion || 1,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Research gap analysis completed.',
      analysis: result,
      recordId: analysis._id,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Run and retrieve System Architecture Blueprint (Module 9)
// @route   POST /api/analysis/:projectId/architecture
// @access  Private
exports.analyzeArchitecture = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOne({ _id: req.params.projectId, userId: req.user.id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const result = await aiService.generateArchitecture(project);

    const analysis = await Analysis.findOneAndUpdate(
      { ideaId: project._id, userId: req.user.id, type: 'architecture' },
      {
        ideaId: project._id,
        userId: req.user.id,
        type: 'architecture',
        result,
        versionAnalyzed: project.currentVersion || 1,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Architecture generated successfully.',
      analysis: result,
      recordId: analysis._id,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Generate comprehensive Final Project Proposal (Module 13)
// @route   POST /api/analysis/:projectId/proposal
// @access  Private
exports.generateProposal = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOne({ _id: req.params.projectId, userId: req.user.id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    // Collect all prior analyses for rich proposal synthesis
    const existingAnalyses = await Analysis.find({ ideaId: project._id, userId: req.user.id });
    const analysisMap = {};
    existingAnalyses.forEach((a) => {
      analysisMap[a.type] = a.result;
    });

    const result = await aiService.generateProposal(project, analysisMap, req.user);

    const analysis = await Analysis.findOneAndUpdate(
      { ideaId: project._id, userId: req.user.id, type: 'proposal' },
      {
        ideaId: project._id,
        userId: req.user.id,
        type: 'proposal',
        result,
        versionAnalyzed: project.currentVersion || 1,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Mark project as finalized
    project.isFinalized = true;
    await project.save();

    res.status(200).json({
      success: true,
      message: 'Comprehensive project proposal generated successfully.',
      proposal: result,
      recordId: analysis._id,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all saved analyses for a project
// @route   GET /api/analysis/:projectId
// @access  Private
exports.getProjectAnalyses = async (req, res, next) => {
  try {
    const analyses = await Analysis.find({ ideaId: req.params.projectId, userId: req.user.id });
    const analysisMap = {};
    analyses.forEach((a) => {
      analysisMap[a.type] = a.result;
    });

    res.status(200).json({
      success: true,
      analyses: analysisMap,
    });
  } catch (err) {
    next(err);
  }
};
