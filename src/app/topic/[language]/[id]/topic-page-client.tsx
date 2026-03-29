"use client";

import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ClassroomModeModal } from "@/components/ui/classroom-mode-modal";
import type { Topic } from "@/lib/types";

export function TopicPageClient({
  topic,
  languageParam,
}: {
  topic: Topic;
  languageParam: string;
}) {
  const [isClassroomModeOpen, setIsClassroomModeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { id: 1, label: "Home", path: "/" },
            { id: 2, label: "Languages", path: "/languages" },
            { id: 3, label: "Topics", path: `/?lang=${encodeURIComponent(topic.language ?? "English")}` },
            {
              id: 4,
              label: topic.title,
              path: `/topic/${encodeURIComponent(languageParam)}/${topic._id}`,
            },
          ]}
        />

        <div className="mb-8">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                {topic.language ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {topic.language}
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => setIsClassroomModeOpen(true)}
                  className="inline-flex items-center justify-center rounded-lg bg-brand-orange-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-brand-orange-600"
                >
                  <FaBookOpen />
                  <span className="ml-2">Classroom mode</span>
                </button>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
                {topic.title}
              </h1>
              {topic.summary && topic.language !== "English" ? (
                <p className="max-w-3xl text-lg leading-relaxed text-slate-700">{topic.summary}</p>
              ) : null}
            </div>
          </div>
        </div>

        <ClassroomModeModal
          isOpen={isClassroomModeOpen}
          onClose={() => setIsClassroomModeOpen(false)}
          topicTitle={topic.title}
          topicLanguage={topic.language}
          summary={topic.summary}
          questions={topic.questions}
          vocabulary={topic.vocabulary}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
                    Conversation Questions
                  </h2>
                  <p className="text-slate-600">
                    {topic.questions?.length ?? 0} questions to spark engaging discussions
                  </p>
                </div>
              </div>

              {topic.questions?.length ? (
                <div className="space-y-4">
                  {topic.questions.map((question, index) => (
                    <div
                      key={`${question}-${index}`}
                      className="rounded-lg border border-slate-200 p-4 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange-500 text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <p className="flex-1 pt-1 text-base leading-relaxed text-slate-900">{question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-lg text-slate-600">No questions available for this topic yet.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-1">
            {topic.vocabulary?.length ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <svg className="h-5 w-5 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Vocabulary
                  <span className="text-sm font-normal text-slate-500">({topic.vocabulary.length})</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topic.vocabulary.map((word) => (
                    <span
                      key={word}
                      className="rounded-lg border border-brand-blue-200 bg-brand-blue-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-blue-200"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {topic.exampleSentences?.length ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <svg className="h-5 w-5 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Example Sentences
                  <span className="text-sm font-normal text-slate-500">
                    ({topic.exampleSentences.length})
                  </span>
                </h3>
                <div className="space-y-3">
                  {topic.exampleSentences.map((sentence, index) => (
                    <div key={`${sentence}-${index}`} className="rounded-lg border-l-4 border-brand-blue-300 bg-brand-blue-50 p-3">
                      <p className="text-sm leading-relaxed italic text-slate-700">&quot;{sentence}&quot;</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {topic.collocations?.length ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <svg className="h-5 w-5 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Collocations
                  <span className="text-sm font-normal text-slate-500">({topic.collocations.length})</span>
                </h3>
                <div className="space-y-2">
                  {topic.collocations.map((collocation, index) => (
                    <div
                      key={`${collocation}-${index}`}
                      className="rounded-lg border border-brand-green-200 bg-brand-green-50 p-2.5 transition-colors hover:bg-brand-green-100"
                    >
                      <p className="text-sm font-medium text-slate-700">{collocation}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 p-6 text-white shadow-md">
              <h3 className="mb-4 text-lg font-bold">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Questions</span>
                  <span className="text-2xl font-bold">{topic.questions?.length ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Vocabulary</span>
                  <span className="text-2xl font-bold">{topic.vocabulary?.length ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Examples</span>
                  <span className="text-2xl font-bold">{topic.exampleSentences?.length ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Collocations</span>
                  <span className="text-2xl font-bold">{topic.collocations?.length ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
