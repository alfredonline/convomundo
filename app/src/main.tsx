import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Landing, { landingLoader } from './screens/landing'
import Topic, { topicLoader } from './screens/topic'
import Languages, { languagesLoader } from './screens/languages'
import WorkWithUs from './screens/work-with-us'
import ErrorBoundary from './components/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    hydrateFallbackElement: (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 to-slate-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md border border-brand-blue-200 p-8 text-center">
          <div className="text-slate-900 text-2xl font-bold">Loading</div>
          <div className="mt-2 text-slate-600">Please wait a moment.</div>
        </div>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: (
          <ErrorBoundary
            title="Topics are unavailable"
            description="We could not load topics for this page. Please try again."
            primaryCtaLabel="Go Home"
            primaryCtaTo="/"
          />
        ),
      },
      {
        path: '/topic/:language/:id',
        element: <Topic />,
        loader: topicLoader,
        errorElement: (
          <ErrorBoundary
            title="Topic not available"
            description="We could not load this topic. Please try again or return to the topics list."
            primaryCtaLabel="Browse languages"
            primaryCtaTo="/languages"
          />
        ),
      },
      {
        path: '/languages',
        element: <Languages />,
        loader: languagesLoader,
        errorElement: (
          <ErrorBoundary
            title="Languages are unavailable"
            description="We could not load the languages list right now. Please try again."
            primaryCtaLabel="Go Home"
            primaryCtaTo="/"
          />
        ),
      },
      {
        path: '/work-with-us',
        element: <WorkWithUs />,
        errorElement: (
          <ErrorBoundary
            title="This page is unavailable"
            description="We could not load this page. Please try again."
            primaryCtaLabel="Go Home"
            primaryCtaTo="/"
          />
        ),
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
