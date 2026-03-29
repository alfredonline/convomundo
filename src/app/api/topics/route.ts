import { NextResponse } from "next/server";
import { getTopics } from "@/lib/topics";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("lang") ?? undefined;
    const topics = await getTopics(language);
    return NextResponse.json(topics);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
