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
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/topic/:language/:id',
        element: <Topic />,
        loader: topicLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/languages',
        element: <Languages />,
        loader: languagesLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/work-with-us',
        element: <WorkWithUs />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
