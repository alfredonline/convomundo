import { Link } from 'react-router'

const SidebarRight = ({
    imageUrl, 
    title, 
    description,
    linkUrl,
    linkText,
    isFeatured,
}: {
    imageUrl: string;
    title: string;
    description: string;
    linkUrl: string;
    linkText: string;
    isFeatured: boolean;
}) => {
  // Check if linkUrl is internal (starts with /) or external
  const isInternalLink = linkUrl.startsWith('/');

  return (
    <aside className={`bg-white rounded-lg shadow-lg border overflow-hidden ${isFeatured ? 'border-brand-orange-500 shadow-xl border-2' : 'border-slate-200'}`}>
      {/* Image */}
      <div className="w-full h-48 overflow-hidden bg-slate-100 relative">
        <img
          src={isFeatured ? imageUrl : 'https://via.placeholder.com/150'}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide image on error and show placeholder
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Link Button */}
        {isInternalLink ? (
          <Link
            to={linkUrl}
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200 group"
          >
            <span>{linkText}</span>
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
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
          </Link>
        ) : (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200 group"
          >
            <span>{linkText}</span>
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </aside>
  )
}

export default SidebarRight