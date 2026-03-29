import Link from "next/link";
import type { Topic } from "@/lib/types";

export function TopicCard({ topic }: { topic: Topic }) {
  const questionCount = topic.questions?.length ?? 0;
  const vocabularyCount = topic.vocabulary?.length ?? 0;
  const previewImage = topic.images?.[0];
  const previewVocabulary = topic.vocabulary?.slice(0, 3) ?? [];
  const summaryPreview = topic.summary
    ? topic.summary.length > 150
      ? `${topic.summary.slice(0, 150)}...`
      : topic.summary
    : "";

  return (
    <Link
      href={`/topic/${encodeURIComponent(topic.language ?? "english")}/${topic._id}`}
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-brand-orange-500 hover:shadow-xl"
    >
      {previewImage ? (
        <div className="h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={previewImage}
            alt={topic.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="p-6">
        {topic.language ? (
          <div className="mb-3">
            <span className="inline-block rounded-full bg-brand-blue-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {topic.language}
            </span>
          </div>
        ) : null}

        <h2 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-slate-700">
          {topic.title}
        </h2>

        {summaryPreview ? (
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {summaryPreview}
          </p>
        ) : null}

        <div className="mb-4 flex items-center gap-4 text-sm text-slate-500">
          {questionCount > 0 ? (
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">
                {questionCount} {questionCount === 1 ? "question" : "questions"}
              </span>
            </div>
          ) : null}
          {vocabularyCount > 0 ? (
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="font-medium">
                {vocabularyCount} {vocabularyCount === 1 ? "word" : "words"}
              </span>
            </div>
          ) : null}
        </div>

        {previewVocabulary.length > 0 ? (
          <div className="border-t border-slate-100 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Key Vocabulary
            </p>
            <div className="flex flex-wrap gap-2">
              {previewVocabulary.map((word) => (
                <span
                  key={word}
                  className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700"
                >
                  {word}
                </span>
              ))}
              {vocabularyCount > 3 ? (
                <span className="px-2 py-1 text-xs font-medium text-slate-500">
                  +{vocabularyCount - 3} more
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="inline-flex w-64 items-center justify-center rounded-lg bg-brand-orange-500 px-4 py-3 text-center font-semibold text-white transition-colors duration-200 group-hover:bg-brand-orange-600">
            View Topic
          </span>
          <svg className="h-5 w-5 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
