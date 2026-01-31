import { useState } from 'react'
import { Link } from 'react-router'
import { SITE_NAME } from '../../constants/branding'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  const menuItems = [
    { label: 'Languages', path: '/languages' },
    { label: 'Work with us', path: '/work-with-us' },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold text-brand-orange-500">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8 flex-shrink-0">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-800 hover:text-brand-orange-500 font-bold transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-slate-700 hover:text-brand-orange-500 hover:bg-brand-blue-50 focus:outline-none focus:ring-2 focus:ring-brand-orange-500 flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 border-t border-slate-200">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:text-brand-orange-500 hover:bg-brand-blue-50 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar