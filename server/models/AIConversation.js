const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'ai', 'system'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const aiConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectIdea',
      default: null,
    },
    module: {
      type: String,
      enum: ['discovery', 'assistant', 'analyzer', 'general'],
      default: 'discovery',
    },
    domain: {
      type: String,
      default: '',
    },
    messages: [messageSchema],
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AIConversation', aiConversationSchema);
