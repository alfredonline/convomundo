import { Link } from 'react-router'
import { SITE_NAME } from '../../constants/branding'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-brand-orange-500">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed">
              Open-source conversation topics and questions for language teachers and learners worldwide.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-600 hover:text-brand-orange-500 transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/languages" className="text-slate-600 hover:text-brand-orange-500 transition-colors duration-200 text-sm">
                  Languages
                </Link>
              </li>
              <li>
                <Link to="/work-with-us" className="text-slate-600 hover:text-brand-orange-500 transition-colors duration-200 text-sm">
                  Work With Us
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/alfredonline/convomundo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-brand-orange-500 transition-colors duration-200 text-sm inline-flex items-center gap-1"
                >
                  GitHub
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Company Information
            </h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                © 2026 AureyaTech Ltd.
              </p>
              <p>
                All rights reserved.
              </p>
              <p className="pt-2">
                Company No: 16885618
              </p>
              <p>
                (Registered in England and Wales)
              </p>
              <p className="pt-2 text-xs leading-relaxed">
                Registered Address:<br />
                71-75 Shelton Street,<br />
                London, Greater London,<br />
                WC2H 9JQ, United Kingdom
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer