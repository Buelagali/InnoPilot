const Problem = require('../models/Problem');
const AIConversation = require('../models/AIConversation');
const aiService = require('../services/ai/AIService');

// @desc    Start or continue problem discovery conversation
// @route   POST /api/problems/discover/chat
// @access  Private
exports.discoverChat = async (req, res, next) => {
  try {
    const { domain, userMessage, conversationId } = req.body;
    let conversation;

    if (conversationId) {
      conversation = await AIConversation.findOne({ _id: conversationId, userId: req.user.id });
    }

    if (!conversation) {
      conversation = await AIConversation.create({
        userId: req.user.id,
        module: 'discovery',
        domain: domain || 'General Technology',
        messages: [],
      });
    }

    if (userMessage) {
      conversation.messages.push({
        sender: 'user',
        text: userMessage,
      });
    }

    // Generate AI mentor response
    const aiText = await aiService.getDiscoveryQuestion(
      domain || conversation.domain,
      conversation.messages,
      req.user
    );

    conversation.messages.push({
      sender: 'ai',
      text: aiText,
    });

    await conversation.save();

    res.status(200).json({
      success: true,
      conversationId: conversation._id,
      domain: conversation.domain,
      messages: conversation.messages,
      latestReply: aiText,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Finalize discovery conversation and generate Problem Discovery Report
// @route   POST /api/problems/discover/finalize
// @access  Private
exports.finalizeDiscovery = async (req, res, next) => {
  try {
    const { conversationId, domain } = req.body;

    const conversation = await AIConversation.findOne({ _id: conversationId, userId: req.user.id });
    if (!conversation || conversation.messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No active discovery conversation found to synthesize.',
        errorCode: 'CONVERSATION_NOT_FOUND',
      });
    }

    const report = await aiService.generateDiscoveryReport(
      domain || conversation.domain,
      conversation.messages,
      req.user
    );

    const problem = await Problem.create({
      userId: req.user.id,
      title: report.identifiedProblem || `Problem in ${domain || conversation.domain}`,
      domain: domain || conversation.domain,
      description: report.problemDescription,
      source: 'discovery_conversation',
      discoveryReport: report,
      status: 'analyzed',
      tags: report.possibleTechDirections || [],
    });

    conversation.isCompleted = true;
    await conversation.save();

    res.status(201).json({
      success: true,
      message: 'Problem discovery report generated and saved.',
      problem,
      report,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Analyze a manually entered problem statement (Module 3)
// @route   POST /api/problems/analyze-manual
// @access  Private
exports.analyzeManualProblem = async (req, res, next) => {
  try {
    const { problemText, domain, title } = req.body;

    if (!problemText || problemText.trim().length < 15) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a descriptive problem statement (at least 15 characters).',
        errorCode: 'INVALID_PROBLEM_TEXT',
      });
    }

    const analysisReport = await aiService.analyzeProblem(problemText, req.user);

    const problem = await Problem.create({
      userId: req.user.id,
      title: title || `Analysis: ${problemText.slice(0, 50)}...`,
      domain: domain || 'Software & Systems',
      description: problemText,
      source: 'manual_analyzer',
      analysisReport,
      status: 'analyzed',
      tags: analysisReport.solutionDirections || [],
    });

    res.status(201).json({
      success: true,
      message: 'Problem analyzed successfully.',
      problem,
      analysisReport,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user problems
// @route   GET /api/problems
// @access  Private
exports.getProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
// @access  Private
exports.getProblemById = async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.id, userId: req.user.id });
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
        errorCode: 'PROBLEM_NOT_FOUND',
      });
    }

    res.status(200).json({
      success: true,
      problem,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete problem
// @route   DELETE /api/problems/:id
// @access  Private
exports.deleteProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
        errorCode: 'PROBLEM_NOT_FOUND',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};
