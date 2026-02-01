import { Outlet, useLocation } from 'react-router'
import { useLayoutEffect, useEffect } from 'react'
import Navbar from './components/navbar';
import Footer from './components/footer';

const SITE_TITLE = 'ConvoMundo';

function getDocumentTitle(location: { pathname: string; search: string }): string {
  const { pathname, search } = location;
  if (pathname === '/' || pathname === '') {
    const lang = new URLSearchParams(search).get('lang') || 'English';
    return `Topics in ${lang} - ${SITE_TITLE}`;
  }
  if (pathname === '/languages') return `Languages - ${SITE_TITLE}`;
  if (pathname === '/work-with-us') return `Work With Us - ${SITE_TITLE}`;
  if (pathname.startsWith('/topic/')) return `Topic - ${SITE_TITLE}`;
  return SITE_TITLE;
}

const GA_MEASUREMENT_ID = 'G-LX50XC45PS';

function App() {
  const location = useLocation();
  const title = getDocumentTitle(location);

  useLayoutEffect(() => {
    document.title = title;
  }, [title]);

  // Send page_view to Google Analytics on client-side navigation
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      const path = location.pathname + location.search;
      window.gtag('config', GA_MEASUREMENT_ID, { page_path: path });
    }
  }, [location.pathname, location.search]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App;
