import Link from "next/link";
import type { Topic } from "@/lib/types";

export function PopularTopicsCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/topic/${encodeURIComponent(topic.language ?? "english")}/${topic._id}`}
      className="group block rounded-lg border border-slate-200 p-3 transition-colors duration-200 hover:border-brand-orange-500 hover:bg-brand-blue-50"
    >
      <h4 className="mb-1 font-semibold text-slate-900 group-hover:text-slate-700">{topic.title}</h4>
      <p className="text-xs text-slate-500">{topic.questions?.length ?? 0} questions</p>
    </Link>
  );
}
