const mongoose = require('mongoose');

const projectIdeaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    problemAddressed: {
      type: String,
      required: true,
    },
    proposedSolution: {
      type: String,
      required: true,
    },
    targetUsers: {
      type: [String],
      default: [],
    },
    coreFeatures: {
      type: [String],
      default: [],
    },
    aiRole: {
      type: String,
      default: '',
    },
    techStack: {
      frontend: [String],
      backend: [String],
      database: [String],
      aiMl: [String],
      tools: [String],
    },
    expectedOutcome: {
      type: String,
      default: '',
    },
    innovationOpportunities: {
      type: [String],
      default: [],
    },
    difficultyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Research Grade'],
      default: 'Intermediate',
    },
    estimatedDevelopmentTime: {
      type: String,
      default: '3 - 4 Months',
    },
    currentVersion: {
      type: Number,
      default: 1,
    },
    domain: {
      type: String,
      default: 'General',
    },
    isSaved: {
      type: Boolean,
      default: true,
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProjectIdea', projectIdeaSchema);
