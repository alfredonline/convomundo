import { useEffect, useMemo, useState } from "react";

type Slide =
  | { type: "summary" }
  | { type: "question"; questionNumber: number; text: string }
  | { type: "vocabulary"; vocabNumber: number; words: string[] };

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
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
    const qs = (questions ?? []).filter(Boolean);
    const vocabChunks = chunk((vocabulary ?? []).filter(Boolean), 5);

    const s: Slide[] = [{ type: "summary" }];

    let vocabCursor = 0;
    qs.forEach((q, i) => {
      s.push({ type: "question", questionNumber: i + 1, text: q });
      const shouldInsertVocabBreak = (i + 1) % 2 === 0;
      if (shouldInsertVocabBreak && vocabCursor < vocabChunks.length) {
        s.push({
          type: "vocabulary",
          vocabNumber: vocabCursor + 1,
          words: vocabChunks[vocabCursor],
        });
        vocabCursor += 1;
      }
    });

    while (vocabCursor < vocabChunks.length) {
      s.push({
        type: "vocabulary",
        vocabNumber: vocabCursor + 1,
        words: vocabChunks[vocabCursor],
      });
      vocabCursor += 1;
    }

    return s;
  }, [questions, vocabulary]);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveIdx(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setActiveIdx((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setActiveIdx((i) => Math.min(slides.length - 1, i + 1));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, slides.length]);

  if (!isOpen) return null;

  const slide = slides[activeIdx];
  const isFirst = activeIdx === 0;
  const isLast = activeIdx === slides.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-brand-blue-900/70"
      role="dialog"
      aria-modal="true"
      aria-label="Classroom mode"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg border border-brand-blue-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-slate-700 bg-brand-blue-100 rounded-full border border-brand-blue-200">
                Classroom mode
              </span>
              {topicLanguage && (
                <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 rounded-full border border-slate-200">
                  {topicLanguage}
                </span>
              )}
            </div>
            <div className="mt-2 text-slate-900 font-bold text-lg truncate">{topicTitle}</div>
            <div className="mt-1 text-slate-600 text-sm">
              Slide {activeIdx + 1} of {slides.length}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center px-3 py-2 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            Exit
          </button>
        </div>

        <div className="p-6 md:p-8">
          {slide.type === "summary" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Summary</h2>
              <p className="mt-3 text-slate-700 text-lg leading-relaxed">
                {summary?.trim()
                  ? summary
                  : "No summary is available for this topic yet. You can still use the questions below."}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-brand-blue-50 border border-brand-blue-200 rounded-lg p-4">
                  <div className="text-slate-900 text-2xl font-bold">{(questions ?? []).length}</div>
                  <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Questions</div>
                </div>
                <div className="bg-brand-blue-50 border border-brand-blue-200 rounded-lg p-4">
                  <div className="text-slate-900 text-2xl font-bold">{(vocabulary ?? []).length}</div>
                  <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Vocabulary</div>
                </div>
                <div className="bg-brand-blue-50 border border-brand-blue-200 rounded-lg p-4">
                  <div className="text-slate-900 text-2xl font-bold">{Math.max(0, slides.length - 1)}</div>
                  <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Next slides</div>
                </div>
              </div>
            </div>
          )}

          {slide.type === "question" && (
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange-100 border border-brand-orange-200 text-slate-700 text-sm font-semibold">
                Question {slide.questionNumber}
              </div>
              <div className="mt-4 text-slate-900 text-2xl md:text-3xl font-bold leading-snug">
                {slide.text}
              </div>
              <div className="mt-4 text-slate-600 text-sm">
                Tip: Ask a follow-up &quot;why&quot; or &quot;how&quot; after the first answer.
              </div>
            </div>
          )}

          {slide.type === "vocabulary" && (
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-50 border border-brand-green-200 text-slate-700 text-sm font-semibold">
                Vocabulary break {slide.vocabNumber}
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
                Use these words in your answers
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {slide.words.map((w) => (
                  <span
                    key={w}
                    className="px-3 py-1.5 text-sm font-semibold text-slate-700 bg-brand-blue-100 rounded-lg border border-brand-blue-200"
                  >
                    {w}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-slate-600 text-sm">
                Ask learners to choose one word and make a sentence before continuing.
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
            disabled={isFirst}
            className="inline-flex items-center justify-center px-4 py-2.5 bg-white text-slate-900 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed"
          >
            Back
          </button>

          <div className="text-slate-600 text-sm hidden sm:block">
            Use the left and right arrow keys to navigate.
          </div>

          <button
            type="button"
            onClick={() => setActiveIdx((i) => Math.min(slides.length - 1, i + 1))}
            disabled={isLast}
            className="inline-flex items-center justify-center px-4 py-2.5 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-brand-orange-500 disabled:cursor-not-allowed"
          >
            {isLast ? "Done" : isFirst ? "Start" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

