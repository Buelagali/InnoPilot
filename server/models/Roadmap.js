const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started',
  },
  estimatedDays: { type: Number, default: 5 },
  deliverables: [String],
});

const phaseSchema = new mongoose.Schema({
  phaseNumber: { type: Number, required: true },
  phaseTitle: { type: String, required: true },
  description: { type: String, default: '' },
  tasks: [taskSchema],
});

const roadmapSchema = new mongoose.Schema(
  {
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectIdea',
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    totalEstimatedWeeks: {
      type: Number,
      default: 16,
    },
    phases: [phaseSchema],
    progressPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

roadmapSchema.methods.calculateProgress = function () {
  let totalTasks = 0;
  let completedTasks = 0;

  this.phases.forEach((phase) => {
    phase.tasks.forEach((task) => {
      totalTasks++;
      if (task.status === 'completed') {
        completedTasks++;
      } else if (task.status === 'in_progress') {
        completedTasks += 0.5;
      }
    });
  });

  this.progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  return this.progressPercentage;
};

module.exports = mongoose.model('Roadmap', roadmapSchema);
