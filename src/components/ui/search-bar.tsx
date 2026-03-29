"use client";

import { FaSearch } from "react-icons/fa";

export function SearchBar({
  onSearch,
  value = "",
  placeholder = "Search...",
}: {
  onSearch: (query: string) => void;
  value?: string;
  placeholder?: string;
}) {
  return (
    <div className="relative mb-4">
      <FaSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-brand-orange-500 focus:outline-none"
      />
    </div>
  );
}
