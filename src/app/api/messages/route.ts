import { NextResponse } from "next/server";
import { getAllMessages, getAdminPin } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const masterPin = getAdminPin();

    if (!authHeader || authHeader !== `Bearer ${masterPin}`) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const messages = getAllMessages();
    return NextResponse.json({ success: true, messages, data: messages });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
