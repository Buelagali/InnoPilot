const AIConversation = require('../models/AIConversation');
const ProjectIdea = require('../models/ProjectIdea');
const Analysis = require('../models/Analysis');
const Roadmap = require('../models/Roadmap');
const aiService = require('../services/ai/AIService');

// @desc    Contextual AI Assistant Conversation (Module 14)
// @route   POST /api/ai/assistant/chat
// @access  Private
exports.assistantChat = async (req, res, next) => {
  try {
    const { message, projectId, conversationId } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.',
        errorCode: 'MISSING_MESSAGE',
      });
    }

    let conversation;
    if (conversationId) {
      conversation = await AIConversation.findOne({ _id: conversationId, userId: req.user.id });
    }

    if (!conversation) {
      conversation = await AIConversation.create({
        userId: req.user.id,
        ideaId: projectId || null,
        module: 'assistant',
        messages: [],
      });
    }

    // Assemble rich context
    let contextData = {};
    if (projectId) {
      const idea = await ProjectIdea.findById(projectId);
      if (idea) {
        contextData.idea = idea;
      }

      const analyses = await Analysis.find({ ideaId: projectId });
      const analysisMap = {};
      analyses.forEach((a) => {
        analysisMap[a.type] = a.result;
      });
      contextData.analyses = analysisMap;

      const roadmap = await Roadmap.findOne({ ideaId: projectId });
      if (roadmap) {
        contextData.roadmapProgress = roadmap.progressPercentage;
      }
    }

    conversation.messages.push({
      sender: 'user',
      text: message,
    });

    const aiReply = await aiService.chatWithAssistant(message, contextData, req.user);

    conversation.messages.push({
      sender: 'ai',
      text: aiReply,
    });

    await conversation.save();

    res.status(200).json({
      success: true,
      conversationId: conversation._id,
      messages: conversation.messages,
      reply: aiReply,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get assistant conversation history
// @route   GET /api/ai/assistant/history
// @access  Private
exports.getAssistantHistory = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    const query = { userId: req.user.id, module: 'assistant' };
    if (projectId) {
      query.ideaId = projectId;
    }

    const conversations = await AIConversation.find(query).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (err) {
    next(err);
  }
};
