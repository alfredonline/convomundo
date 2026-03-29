import Link from "next/link";

export function SidebarCard({
  imageUrl,
  title,
  description,
  linkUrl,
  linkText,
  isFeatured = false,
}: {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
  isFeatured?: boolean;
}) {
  const cardClass = isFeatured
    ? "border-brand-orange-500 shadow-xl border-2"
    : "border-slate-200";

  const content = (
    <>
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-tight text-slate-900">{title}</h2>
        <p className="mb-6 text-sm leading-relaxed text-slate-600">{description}</p>
        <span className="inline-flex w-full items-center justify-center rounded-lg bg-brand-orange-500 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-brand-orange-600">
          <span>{linkText}</span>
          <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </>
  );

  return (
    <aside className={`overflow-hidden rounded-lg border bg-white shadow-lg ${cardClass}`}>
      {linkUrl.startsWith("/") ? (
        <Link href={linkUrl}>{content}</Link>
      ) : (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )}
    </aside>
  );
}
