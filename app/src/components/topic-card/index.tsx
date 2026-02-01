import { Link } from 'react-router'

interface Topic {
  _id: string;
  title: string;
  summary?: string;
  language?: string;
  questions?: string[];
  vocabulary?: string[];
  images?: string[];
  exampleSentences?: string[];
  collocations?: string[];
}

const TopicCard = ({ topic }: { topic: Topic }) => {
  const questionCount = topic.questions?.length || 0;
  const vocabularyCount = topic.vocabulary?.length || 0;
  const previewImage = topic.images && topic.images.length > 0 ? topic.images[0] : null;
  const previewVocabulary = topic.vocabulary?.slice(0, 3) || [];
  const summaryPreview = topic.summary 
    ? (topic.summary.length > 150 ? `${topic.summary.substring(0, 150)}...` : topic.summary)
    : '';

  return (
    <Link
      to={`/topic/${encodeURIComponent(topic.language || 'english')}/${topic._id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-brand-orange-500 cursor-pointer overflow-hidden group"
    >
      {/* Image Preview */}
      {previewImage && (
        <div className="w-full h-48 overflow-hidden bg-slate-100">
          <img
            src={previewImage}
            alt={topic.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Hide image on error
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Language Badge */}
        {topic.language && (
          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold text-slate-700 bg-brand-blue-100 rounded-full">
              {topic.language}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
          {topic.title}
        </h2>

        {/* Summary */}
        {summaryPreview && (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {summaryPreview}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
          {questionCount > 0 && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-brand-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">{questionCount} {questionCount === 1 ? 'question' : 'questions'}</span>
            </div>
          )}
          {vocabularyCount > 0 && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-brand-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="font-medium">{vocabularyCount} {vocabularyCount === 1 ? 'word' : 'words'}</span>
            </div>
          )}
        </div>

        {/* Vocabulary Preview */}
        {previewVocabulary.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Key Vocabulary
            </p>
            <div className="flex flex-wrap gap-2">
              {previewVocabulary.map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-slate-700 bg-slate-50 rounded border border-slate-200"
                >
                  {word}
                </span>
              ))}
              {vocabularyCount > 3 && (
                <span className="px-2 py-1 text-xs font-medium text-slate-500">
                  +{vocabularyCount - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* View More Indicator */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center justify-center w-64 text-center px-4 py-3 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200 group">
        View Topic
          </span>
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-brand-orange-500 group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default TopicCard