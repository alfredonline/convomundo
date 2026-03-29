import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopicById } from "@/lib/topics";
import { TopicPageClient } from "./topic-page-client";

export const dynamic = "force-dynamic";

type TopicPageProps = {
  params: Promise<{
    language: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const topic = await getTopicById(resolvedParams.id);

  if (!topic) {
    return {
      title: "Topic not found",
    };
  }

  const path = `/topic/${resolvedParams.language}/${resolvedParams.id}`;

  return {
    title: topic.title,
    description:
      topic.summary ??
      `Conversation topic: ${topic.title}. Questions, vocabulary, and example sentences for language teaching.`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: topic.title,
      description: topic.summary ?? topic.title,
      type: "article",
      url: path,
      images: topic.images?.length ? [{ url: topic.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: topic.title,
      description: topic.summary ?? topic.title,
      images: topic.images?.length ? [topic.images[0]] : undefined,
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const resolvedParams = await params;
  const topic = await getTopicById(resolvedParams.id);

  if (!topic) {
    notFound();
  }

  return <TopicPageClient topic={topic} languageParam={resolvedParams.language} />;
}
