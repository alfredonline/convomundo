"use client";

import { useEffect, useMemo, useState } from "react";

type Slide =
  | { type: "summary" }
  | { type: "question"; questionNumber: number; text: string }
  | { type: "vocabulary"; vocabNumber: number; words: string[] };

function chunk<T>(items: T[], size: number) {
  const output: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    output.push(items.slice(index, index + size));
  }
  return output;
}

export function ClassroomModeModal(props: {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  topicLanguage?: string;
  summary?: string;
  questions?: string[];
  vocabulary?: string[];
}) {
  const { isOpen, onClose, topicTitle, topicLanguage, summary, questions, vocabulary } = props;

  const slides = useMemo(() => {
    const questionList = (questions ?? []).filter(Boolean);
    const vocabularyChunks = chunk((vocabulary ?? []).filter(Boolean), 5);
    const output: Slide[] = [{ type: "summary" }];

    let vocabCursor = 0;

    questionList.forEach((question, index) => {
      output.push({ type: "question", questionNumber: index + 1, text: question });
      if ((index + 1) % 2 === 0 && vocabCursor < vocabularyChunks.length) {
        output.push({
          type: "vocabulary",
          vocabNumber: vocabCursor + 1,
          words: vocabularyChunks[vocabCursor],
        });
        vocabCursor += 1;
      }
    });

    while (vocabCursor < vocabularyChunks.length) {
      output.push({
        type: "vocabulary",
        vocabNumber: vocabCursor + 1,
        words: vocabularyChunks[vocabCursor],
      });
      vocabCursor += 1;
    }

    return output;
  }, [questions, vocabulary]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") setActiveIndex((index) => Math.max(0, index - 1));
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => Math.min(slides.length - 1, index + 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, slides.length]);

  if (!isOpen) {
    return null;
  }

  const slide = slides[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-blue-900/70 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Classroom mode"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-lg border border-brand-blue-200 bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-brand-blue-200 bg-brand-blue-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                Classroom mode
              </span>
              {topicLanguage ? (
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {topicLanguage}
                </span>
              ) : null}
            </div>
            <div className="mt-2 truncate text-lg font-bold text-slate-900">{topicTitle}</div>
            <div className="mt-1 text-sm text-slate-600">
              Slide {activeIndex + 1} of {slides.length}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            Exit
          </button>
        </div>

        <div className="p-6 md:p-8">
          {slide.type === "summary" ? (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Summary</h2>
              <p className="mt-3 text-lg leading-relaxed text-slate-700">
                {summary?.trim()
                  ? summary
                  : "No summary is available for this topic yet. You can still use the questions below."}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4">
                  <div className="text-2xl font-bold text-slate-900">{questions?.length ?? 0}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Questions
                  </div>
                </div>
                <div className="rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4">
                  <div className="text-2xl font-bold text-slate-900">{vocabulary?.length ?? 0}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Vocabulary
                  </div>
                </div>
                <div className="rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4">
                  <div className="text-2xl font-bold text-slate-900">{Math.max(0, slides.length - 1)}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Next slides
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {slide.type === "question" ? (
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange-200 bg-brand-orange-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
                Question {slide.questionNumber}
              </div>
              <div className="mt-4 text-2xl leading-snug font-bold text-slate-900 md:text-3xl">
                {slide.text}
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Tip: Ask a follow-up &quot;why&quot; or &quot;how&quot; after the first answer.
              </div>
            </div>
          ) : null}

          {slide.type === "vocabulary" ? (
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-green-200 bg-brand-green-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                Vocabulary break {slide.vocabNumber}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                Use these words in your answers
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {slide.words.map((word) => (
                  <span
                    key={word}
                    className="rounded-lg border border-brand-blue-200 bg-brand-blue-100 px-3 py-1.5 text-sm font-semibold text-slate-700"
                  >
                    {word}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm text-slate-600">
                Ask learners to choose one word and make a sentence before continuing.
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-200 p-5">
          <button
            type="button"
            onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
            disabled={isFirst}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-900 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
          >
            Back
          </button>

          <div className="hidden text-sm text-slate-600 sm:block">
            Use the left and right arrow keys to navigate.
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((index) => Math.min(slides.length - 1, index + 1))}
            disabled={isLast}
            className="inline-flex items-center justify-center rounded-lg bg-brand-orange-500 px-4 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-brand-orange-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-orange-500"
          >
            {isLast ? "Done" : isFirst ? "Start" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
