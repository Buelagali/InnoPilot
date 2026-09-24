const mongoose = require('mongoose');

const ideaVersionSchema = new mongoose.Schema(
  {
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectIdea',
      required: true,
      index: true,
    },
    versionNumber: {
      type: Number,
      required: true,
    },
    evolutionAction: {
      type: String,
      default: 'Initial Version',
    },
    changeSummary: {
      type: String,
      default: '',
    },
    snapshot: {
      title: String,
      problemAddressed: String,
      proposedSolution: String,
      targetUsers: [String],
      coreFeatures: [String],
      aiRole: String,
      techStack: {
        frontend: [String],
        backend: [String],
        database: [String],
        aiMl: [String],
        tools: [String],
      },
      expectedOutcome: String,
      innovationOpportunities: [String],
      difficultyLevel: String,
      estimatedDevelopmentTime: String,
    },
  },
  {
    timestamps: true,
  }
);

ideaVersionSchema.index({ ideaId: 1, versionNumber: 1 }, { unique: true });

module.exports = mongoose.model('IdeaVersion', ideaVersionSchema);
