"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME } from "@/lib/constants";

const menuItems = [
  { label: "Languages", path: "/languages" },
  { label: "Work with us", path: "/work-with-us" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white py-4 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center text-2xl font-bold text-brand-orange-500">
          {SITE_NAME}
        </Link>

        <div className="hidden shrink-0 items-center space-x-8 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="font-bold text-slate-800 transition-colors duration-200 hover:text-brand-orange-500"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="shrink-0 rounded-md p-2 text-slate-700 hover:bg-brand-blue-50 hover:text-brand-orange-500 focus:outline-none focus:ring-2 focus:ring-brand-orange-500 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-300 ease-in-out sm:px-6 lg:px-8 md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="space-y-1 border-t border-slate-200 px-2 pt-2 pb-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-semibold text-slate-700 transition-colors duration-200 hover:bg-brand-blue-50 hover:text-brand-orange-500"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
