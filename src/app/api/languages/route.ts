import { NextResponse } from "next/server";
import { getLanguages } from "@/lib/topics";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const languages = await getLanguages();
    return NextResponse.json(languages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
