const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    domain: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      enum: ['discovery_conversation', 'manual_analyzer'],
      default: 'discovery_conversation',
    },
    discoveryReport: {
      identifiedProblem: String,
      problemDescription: String,
      targetAudience: String,
      whyItMatters: String,
      currentSolutions: String,
      limitationsOfCurrent: String,
      potentialOpportunity: String,
      possibleTechDirections: [String],
    },
    analysisReport: {
      problemClarity: String,
      targetUsers: [String],
      rootCause: String,
      impact: String,
      existingSolutions: [String],
      limitations: [String],
      stakeholders: [String],
      requiredData: [String],
      technicalComplexity: {
        level: { type: String, enum: ['Low', 'Moderate', 'High', 'Advanced'] },
        rationale: String,
      },
      solutionDirections: [String],
    },
    status: {
      type: String,
      enum: ['draft', 'analyzed', 'ideas_generated', 'archived'],
      default: 'draft',
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Problem', problemSchema);
