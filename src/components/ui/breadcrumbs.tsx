import Link from "next/link";

interface BreadcrumbItem {
  id: number;
  label: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {items.map((item, index) => (
        <span key={`${item.id}-${item.path}`} className="font-bold">
          <Link href={item.path} className="transition-colors hover:text-brand-orange-500">
            {item.label}
          </Link>
          {index < items.length - 1 ? <span className="mx-2">&gt;</span> : null}
        </span>
      ))}
    </div>
  );
}
