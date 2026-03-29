"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_NAME, VERIFIED_LANGUAGES } from "@/lib/constants";
import type { Topic } from "@/lib/types";
import { NativeSpeakerVerifiedCard } from "@/components/ui/native-speaker-verified-card";
import { PopularTopicsCard } from "@/components/ui/popular-topics-card";
import { SearchBar } from "@/components/ui/search-bar";
import { SidebarCard } from "@/components/ui/sidebar-card";
import { StatsCard } from "@/components/ui/stats-card";
import { TopicCard } from "@/components/ui/topic-card";

function topicMatchesSearch(topic: Topic, query: string) {
  const trimmedQuery = query.toLowerCase().trim();
  if (!trimmedQuery) {
    return true;
  }

  return (
    topic.title.toLowerCase().includes(trimmedQuery) ||
    topic.summary?.toLowerCase().includes(trimmedQuery) === true
  );
}

export function LandingPageClient({
  topics,
  currentLanguage,
  initialQuery,
  didFetchSucceed,
  fetchErrorMessage,
}: {
  topics: Topic[];
  currentLanguage: string;
  initialQuery: string;
  didFetchSucceed: boolean;
  fetchErrorMessage?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const updateSearch = (value: string) => {
    setSearchQuery(value);
    const nextParams = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

  const filteredTopics = topics.filter((topic) => topicMatchesSearch(topic, searchQuery));
  const totalQuestions = filteredTopics.reduce((total, topic) => total + (topic.questions?.length ?? 0), 0);
  const totalVocabulary = filteredTopics.reduce(
    (total, topic) => total + (topic.vocabulary?.length ?? 0),
    0
  );
  const featuredTopic = filteredTopics[0] ?? null;
  const popularTopics = filteredTopics.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 to-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12">
          <div className="overflow-hidden rounded-lg border border-brand-blue-200 bg-white shadow-lg">
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h1 className="mt-5 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
                    Teach through conversation with{" "}
                    <span className="text-brand-orange-500">{SITE_NAME}</span>
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
                    Find ready-to-use topics, questions, vocabulary, and example sentences to keep your
                    lessons flowing. Browse by language and pick a topic in seconds.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/languages"
                      className="inline-flex items-center justify-center rounded-lg bg-brand-orange-500 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-brand-orange-600"
                    >
                      Browse languages
                    </Link>
                    <Link
                      href={`/?lang=${encodeURIComponent(currentLanguage)}`}
                      className="inline-flex items-center justify-center rounded-lg border border-brand-orange-200 bg-white px-5 py-3 font-semibold text-brand-orange-500 transition-colors duration-200 hover:bg-brand-blue-50"
                    >
                      Explore topics in {currentLanguage}
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          Topics in <span className="text-brand-orange-500">{currentLanguage}</span>
                        </h2>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">
                          Use the sidebar stats and popular topics to find a great lesson fast.
                        </p>
                      </div>
                      <Link
                        href="/work-with-us"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-brand-blue-200 bg-white px-3 py-2 font-semibold text-slate-700 transition-colors duration-200 hover:bg-brand-blue-50"
                      >
                        Contribute
                      </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        { label: "Topics", value: topics.length },
                        { label: "Questions", value: totalQuestions },
                        { label: "Words", value: totalVocabulary },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-brand-blue-200 bg-white p-3">
                          <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Conversation questions", "Key vocabulary", "Example sentences"].map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-brand-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {topics.length > 0 ? (
          <SearchBar onSearch={updateSearch} value={searchQuery} placeholder="Search topics..." />
        ) : null}

        {topics.length === 0 ? (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold text-slate-900">No topics to show</h3>
            <p className="text-slate-700">
              {!didFetchSucceed
                ? `We couldn't load topics right now. ${fetchErrorMessage ?? ""}`.trim()
                : "There are no topics for this language yet."}
            </p>
          </div>
        ) : filteredTopics.length === 0 ? (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold text-slate-900">No topics match your search</h3>
            <p className="text-slate-700">
              No topics match &quot;{searchQuery}&quot;. Try a different search or clear the search to see all topics.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-6">
                {filteredTopics.map((topic) => (
                  <TopicCard key={topic._id} topic={topic} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="space-y-6">
                <StatsCard
                  totalTopics={filteredTopics.length}
                  totalQuestions={totalQuestions}
                  totalVocabulary={totalVocabulary}
                />

                {featuredTopic?.images?.length ? (
                  <SidebarCard
                    imageUrl={featuredTopic.images[0]}
                    title={`Featured: ${featuredTopic.title}`}
                    description={
                      featuredTopic.summary ||
                      `Explore ${featuredTopic.questions?.length ?? 0} conversation questions about ${featuredTopic.title.toLowerCase()}.`
                    }
                    linkUrl={`/topic/${encodeURIComponent(featuredTopic.language ?? "english")}/${featuredTopic._id}`}
                    linkText="Explore Topic"
                    isFeatured
                  />
                ) : null}

                {VERIFIED_LANGUAGES.includes(currentLanguage) ? (
                  <NativeSpeakerVerifiedCard language={currentLanguage} />
                ) : null}

                {popularTopics.length > 0 ? (
                  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
                    <h3 className="mb-4 text-lg font-bold text-slate-900">Popular Topics</h3>
                    <div className="space-y-3">
                      {popularTopics.map((topic) => (
                        <PopularTopicsCard key={topic._id} topic={topic} />
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Official partner
                  </h3>
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <a
                      href="https://www.lingjo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 overflow-hidden rounded-lg border border-slate-200 transition-colors hover:border-brand-orange-300 focus:ring-2 focus:ring-brand-orange-400 focus:ring-offset-2 focus:outline-none"
                    >
                      <img src="/logo.png" alt="Lingjo" className="h-16 w-16 object-contain" />
                    </a>
                    <p className="text-center text-sm leading-relaxed text-slate-700 sm:text-left">
                      ConvoMundo is an official partner of{" "}
                      <a
                        href="https://www.lingjo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-orange-500 underline decoration-brand-orange-200 transition-colors hover:text-brand-orange-600 hover:decoration-brand-orange-500"
                      >
                        Lingjo
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
