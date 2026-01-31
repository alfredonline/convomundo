const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
  {
    language: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: {
      type: [String],
      default: [],
    },
    vocabulary: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      default: '',
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    exampleSentences: {
      type: [String],
      default: [],
    },
    collocations: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'topics',
  }
);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;

