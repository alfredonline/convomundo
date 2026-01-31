import { useRouteError, isRouteErrorResponse, Link } from 'react-router'

type ErrorBoundaryProps = {
  title?: string
  description?: string
  primaryCtaLabel?: string
  primaryCtaTo?: string
}

export default function ErrorBoundary({
  title,
  description,
  primaryCtaLabel = 'Go Home',
  primaryCtaTo = '/',
}: ErrorBoundaryProps) {
  const error = useRouteError()

  const getErrorIcon = (status?: number) => {
    if (status === 404) {
      return (
        <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
    if (status === 500 || status === 503) {
      return (
        <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
    return (
      <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  const getErrorTitle = (status?: number) => {
    if (status === 404) return 'Page Not Found'
    if (status === 500) return 'Server Error'
    if (status === 503) return 'Service Unavailable'
    return 'Something went wrong'
  }

  const getErrorDescription = (status?: number, statusText?: string) => {
    if (status === 404) {
      return 'The page you\'re looking for doesn\'t exist or has been moved.'
    }
    if (status === 500) {
      return 'We encountered an internal server error. Please try again later.'
    }
    if (status === 503) {
      return 'The service is temporarily unavailable. Please try again in a moment.'
    }
    return statusText || 'An unexpected error occurred. Please try again.'
  }

  if (isRouteErrorResponse(error)) {
    const resolvedTitle = title ?? getErrorTitle(error.status)
    const resolvedDescription = description ?? getErrorDescription(error.status, error.statusText)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md border border-slate-200 p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-brand-blue-100 flex items-center justify-center">
              {getErrorIcon(error.status)}
            </div>
          </div>

          {/* Status Code */}
          {error.status && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 text-2xl font-bold text-slate-900 bg-brand-orange-100 rounded-full">
                {error.status}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {resolvedTitle}
          </h1>

          {/* Description */}
          <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
            {resolvedDescription}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={primaryCtaTo}
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {primaryCtaLabel}
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md border border-slate-200 p-8 md:p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-brand-blue-100 flex items-center justify-center">
            <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {title ?? 'Unexpected Error'}
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
          {description ??
            (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={primaryCtaTo}
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {primaryCtaLabel}
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
