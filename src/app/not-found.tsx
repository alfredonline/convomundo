import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 to-slate-50 px-4 py-12">
      <div className="mx-auto max-w-lg rounded-lg border border-brand-blue-200 bg-white p-8 text-center shadow-md">
        <div className="text-2xl font-bold text-slate-900">Topic not available</div>
        <div className="mt-2 text-slate-600">
          We could not load this topic. Please try again or return to the topics list.
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/languages"
            className="inline-flex items-center justify-center rounded-lg bg-brand-orange-500 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-brand-orange-600"
          >
            Browse languages
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
