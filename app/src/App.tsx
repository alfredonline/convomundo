import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import Navbar from './components/navbar';
import Footer from './components/footer';

const GA_MEASUREMENT_ID = 'G-LX50XC45PS';

function App() {
  const location = useLocation();

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
