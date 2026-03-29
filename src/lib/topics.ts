import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { TopicModel } from "@/lib/topic-model";
import type { Topic } from "@/lib/types";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serializeTopic(doc: Record<string, unknown>): Topic {
  return {
    _id: String(doc._id ?? ""),
    title: String(doc.title ?? ""),
    language: typeof doc.language === "string" ? doc.language : undefined,
    summary: typeof doc.summary === "string" ? doc.summary : undefined,
    questions: Array.isArray(doc.questions) ? (doc.questions as string[]) : [],
    vocabulary: Array.isArray(doc.vocabulary) ? (doc.vocabulary as string[]) : [],
    images: Array.isArray(doc.images) ? (doc.images as string[]) : [],
    exampleSentences: Array.isArray(doc.exampleSentences)
      ? (doc.exampleSentences as string[])
      : [],
    collocations: Array.isArray(doc.collocations) ? (doc.collocations as string[]) : [],
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : typeof doc.createdAt === "string"
          ? doc.createdAt
          : undefined,
  };
}

export async function getTopics(language?: string) {
  await connectToDatabase();

  const filter: Record<string, unknown> = {};

  if (language?.trim()) {
    filter.language = {
      $regex: new RegExp(`^${escapeRegex(language.trim())}$`, "i"),
    };
  }

  const topics = await TopicModel.find(filter).sort({ createdAt: -1 }).lean();
  return topics.map((topic) => serializeTopic(topic as unknown as Record<string, unknown>));
}

export async function getTopicById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectToDatabase();
  const topic = await TopicModel.findById(id).lean();

  if (!topic) {
    return null;
  }

  return serializeTopic(topic as unknown as Record<string, unknown>);
}

export async function getLanguages() {
  await connectToDatabase();
  const languages = await TopicModel.distinct("language");
  return languages.sort((a, b) => a.localeCompare(b));
}
