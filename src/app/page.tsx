import type { Metadata } from "next";
import { LandingPageClient } from "@/components/landing-page-client";
import { SITE_NAME } from "@/lib/constants";
import { getTopics } from "@/lib/topics";

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams: Promise<{
    lang?: string;
    q?: string;
  }>;
};

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const params = await searchParams;
  const language = params.lang?.trim() || "English";
  const search = params.q?.trim();
  const query = new URLSearchParams();

  if (params.lang?.trim()) {
    query.set("lang", params.lang.trim());
  }
  if (search) {
    query.set("q", search);
  }

  return {
    title: `Topics in ${language}`,
    description: `Browse conversation topics in ${language}. Find questions, vocabulary, and example sentences for language teaching.`,
    alternates: {
      canonical: query.toString() ? `/?${query.toString()}` : "/",
    },
    openGraph: {
      title: `Topics in ${language} | ${SITE_NAME}`,
      description: `Conversation topics in ${language} for language learners and teachers.`,
      url: query.toString() ? `/?${query.toString()}` : "/",
    },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const currentLanguage = params.lang?.trim() || "English";
  const initialQuery = params.q ?? "";

  try {
    const topics = await getTopics(currentLanguage);

    return (
      <LandingPageClient
        topics={topics}
        currentLanguage={currentLanguage}
        initialQuery={initialQuery}
        didFetchSucceed
      />
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return (
      <LandingPageClient
        topics={[]}
        currentLanguage={currentLanguage}
        initialQuery={initialQuery}
        didFetchSucceed={false}
        fetchErrorMessage={`We're having trouble getting topics right now, but you can still explore the site. (${message})`}
      />
    );
  }
}
