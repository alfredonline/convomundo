import { NextResponse } from "next/server";
import { getTopicById } from "@/lib/topics";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const topic = await getTopicById(id);

    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
