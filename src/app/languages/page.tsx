import type { Metadata } from "next";
import { LanguagesPageClient } from "@/components/languages-page-client";
import { getLanguages } from "@/lib/topics";

export const dynamic = "force-dynamic";

type LanguagesPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Languages",
  description:
    "Browse conversation topics by language. Select a language to view available topics, questions, and vocabulary for language teaching.",
  alternates: {
    canonical: "/languages",
  },
};

export default async function LanguagesPage({ searchParams }: LanguagesPageProps) {
  const params = await searchParams;
  const languages = await getLanguages();

  return <LanguagesPageClient languages={languages} initialQuery={params.q ?? ""} />;
}
