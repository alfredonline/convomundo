export function StatsCard({
  totalTopics,
  totalQuestions,
  totalVocabulary,
}: {
  totalTopics: number;
  totalQuestions: number;
  totalVocabulary: number;
}) {
  return (
    <div className="rounded-lg border border-brand-blue-200 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-slate-900">Statistics</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total Topics</span>
          <span className="text-2xl font-bold text-brand-green-500">{totalTopics}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total Questions</span>
          <span className="text-2xl font-bold text-brand-green-500">{totalQuestions}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Vocabulary Words</span>
          <span className="text-2xl font-bold text-brand-green-500">{totalVocabulary}</span>
        </div>
      </div>
    </div>
  );
}
