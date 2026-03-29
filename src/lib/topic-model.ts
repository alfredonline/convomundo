import mongoose, { Model, Schema } from "mongoose";

interface TopicDocument {
  language: string;
  title: string;
  questions: string[];
  vocabulary: string[];
  summary: string;
  images: string[];
  exampleSentences: string[];
  collocations: string[];
  createdAt: Date;
}

const topicSchema = new Schema<TopicDocument>(
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
      default: "",
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
    collection: "topics",
  }
);

export const TopicModel =
  (mongoose.models.Topic as Model<TopicDocument> | undefined) ??
  mongoose.model<TopicDocument>("Topic", topicSchema);
