import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 inline-block text-2xl font-bold text-brand-orange-500">
              {SITE_NAME}
            </Link>
            <p className="text-sm leading-relaxed text-slate-600">
              Open-source conversation topics and questions for language teachers and learners
              worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:text-brand-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/languages"
                  className="transition-colors duration-200 hover:text-brand-orange-500"
                >
                  Languages
                </Link>
              </li>
              <li>
                <Link
                  href="/work-with-us"
                  className="transition-colors duration-200 hover:text-brand-orange-500"
                >
                  Work With Us
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/alfredonline/convomundo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-brand-orange-500"
                >
                  GitHub
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Company Information
            </h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>© 2026 AureyaTech Ltd.</p>
              <p>All rights reserved.</p>
              <p className="pt-2">Company No: 16885618</p>
              <p>(Registered in England and Wales)</p>
              <p className="pt-2 text-xs leading-relaxed">
                Registered Address:
                <br />
                71-75 Shelton Street,
                <br />
                London, Greater London,
                <br />
                WC2H 9JQ, United Kingdom
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
