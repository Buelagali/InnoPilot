const Problem = require('../models/Problem');
const AIConversation = require('../models/AIConversation');
const aiService = require('../services/ai/AIService');
const { isDbConnected } = require('../config/db');
const { problems: fallbackProblems } = require('../services/resilientStore');

const fallbackConversations = new Map();

// @desc    Start or continue problem discovery conversation
// @route   POST /api/problems/discover/chat
// @access  Private
exports.discoverChat = async (req, res, next) => {
  try {
    const { domain, userMessage, conversationId } = req.body;
    let conversation;

    if (isDbConnected()) {
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

      return res.status(200).json({
        success: true,
        conversationId: conversation._id,
        domain: conversation.domain,
        messages: conversation.messages,
        latestReply: aiText,
      });
    }

    // Resilient fallback when DB is connecting
    const convKey = conversationId || `conv_${Date.now()}`;
    conversation = fallbackConversations.get(convKey) || {
      _id: convKey,
      userId: req.user.id,
      module: 'discovery',
      domain: domain || 'General Technology',
      messages: [],
    };

    if (userMessage) {
      conversation.messages.push({
        sender: 'user',
        text: userMessage,
      });
    }

    const aiText = await aiService.getDiscoveryQuestion(
      domain || conversation.domain,
      conversation.messages,
      req.user
    );

    conversation.messages.push({
      sender: 'ai',
      text: aiText,
    });

    fallbackConversations.set(convKey, conversation);

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

    let conversation;
    if (isDbConnected()) {
      conversation = await AIConversation.findOne({ _id: conversationId, userId: req.user.id });
    } else {
      conversation = fallbackConversations.get(conversationId);
    }

    if (!conversation || !conversation.messages || conversation.messages.length === 0) {
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

    let problem;
    if (isDbConnected()) {
      problem = await Problem.create({
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
    } else {
      problem = {
        _id: `prob_${Date.now()}`,
        userId: req.user.id,
        title: report.identifiedProblem || `Problem in ${domain || conversation.domain}`,
        domain: domain || conversation.domain,
        description: report.problemDescription,
        source: 'discovery_conversation',
        discoveryReport: report,
        status: 'analyzed',
        tags: report.possibleTechDirections || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackProblems.push(problem);
    }

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

    let problem;
    if (isDbConnected()) {
      problem = await Problem.create({
        userId: req.user.id,
        title: title || `Analysis: ${problemText.slice(0, 50)}...`,
        domain: domain || 'Software & Systems',
        description: problemText,
        source: 'manual_analyzer',
        analysisReport,
        status: 'analyzed',
        tags: analysisReport.solutionDirections || [],
      });
    } else {
      problem = {
        _id: `prob_${Date.now()}`,
        userId: req.user.id,
        title: title || `Analysis: ${problemText.slice(0, 50)}...`,
        domain: domain || 'Software & Systems',
        description: problemText,
        source: 'manual_analyzer',
        analysisReport,
        status: 'analyzed',
        tags: analysisReport.solutionDirections || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackProblems.push(problem);
    }

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
    if (isDbConnected()) {
      const problems = await Problem.find({ userId: req.user.id }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: problems.length,
        problems,
      });
    }

    const userProblems = fallbackProblems.filter((p) => String(p.userId) === String(req.user.id));
    res.status(200).json({
      success: true,
      count: userProblems.length,
      problems: userProblems,
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
    let problem;
    if (isDbConnected()) {
      problem = await Problem.findOne({ _id: req.params.id, userId: req.user.id });
    } else {
      problem = fallbackProblems.find(
        (p) => String(p._id) === String(req.params.id) && String(p.userId) === String(req.user.id)
      );
    }

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
    if (isDbConnected()) {
      const problem = await Problem.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found.',
          errorCode: 'PROBLEM_NOT_FOUND',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Problem deleted successfully.',
      });
    }

    const index = fallbackProblems.findIndex(
      (p) => String(p._id) === String(req.params.id) && String(p.userId) === String(req.user.id)
    );
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.',
        errorCode: 'PROBLEM_NOT_FOUND',
      });
    }

    fallbackProblems.splice(index, 1);
    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};
