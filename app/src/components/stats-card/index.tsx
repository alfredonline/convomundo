const StatsCard = ({
  totalTopics,
  totalQuestions,
  totalVocabulary,
}: {
  totalTopics: number;
  totalQuestions: number;
  totalVocabulary: number;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-brand-blue-200 p-6">
    <h3 className="text-lg font-bold text-slate-900 mb-4">Statistics</h3>
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
  )
}

export default StatsCard