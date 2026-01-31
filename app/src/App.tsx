import { Outlet, useLocation } from 'react-router'
import { useLayoutEffect } from 'react'
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

function App() {
  const location = useLocation();
  const title = getDocumentTitle(location);

  useLayoutEffect(() => {
    document.title = title;
  }, [title]);

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
