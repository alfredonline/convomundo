"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LANGUAGE_IMAGES } from "@/lib/constants";
import { SearchBar } from "@/components/ui/search-bar";

export function LanguagesPageClient({
  languages,
  initialQuery,
}: {
  languages: string[];
  initialQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const updateSearch = (value: string) => {
    setSearchQuery(value);
    const nextParams = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

  const filteredLanguages = languages.filter((language) =>
    language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SearchBar onSearch={updateSearch} value={searchQuery} />
          <h1 className="mb-4 text-6xl leading-relaxed font-bold text-slate-700">
            Available Languages
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Explore conversation topics and questions in different languages. Select a language to view all available topics.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredLanguages.map((language) => {
            const imageUrl = LANGUAGE_IMAGES[language];
            return (
              <Link
                key={language}
                href={`/?lang=${encodeURIComponent(language)}`}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-brand-orange-500 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`${language} topics`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-orange-500 to-brand-orange-600">
                      <span className="text-4xl font-bold text-white">
                        {language.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-orange-500">
                      {language}
                    </h2>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600">View topics</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 text-center shadow-md">
          <p className="text-lg text-slate-600">More languages coming soon...</p>
        </div>

        {filteredLanguages.length === 0 ? (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-12 text-center shadow-md">
            <p className="text-lg text-slate-600">
              {searchQuery.trim()
                ? `No languages match "${searchQuery}". Try a different search.`
                : "No languages available yet."}
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
