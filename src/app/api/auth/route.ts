import { NextResponse } from "next/server";
import { getAdminPin } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    const masterPin = getAdminPin();

    if (!pin || pin !== masterPin) {
      return NextResponse.json(
        { success: false, error: "Access Denied: Invalid Master PIN." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      token: masterPin,
      user: {
        role: "SYS_ADMIN",
        scope: ["analytics", "cms_projects", "cms_techstack", "messages_inbox", "system_settings"],
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
