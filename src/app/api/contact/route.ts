import { NextResponse } from "next/server";
import { saveContactMessage, recordPageView } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Capture client telemetry safely
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const ipHash = Buffer.from(ip).toString("base64").substring(0, 10);

    const saved = saveContactMessage({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      ipHash,
    });

    // Record interaction in analytics
    recordPageView({
      path: "/#contact-transmitted",
      referrer: "Contact Form Direct",
      userAgent: request.headers.get("user-agent") || "unknown",
      device: "desktop",
      browser: "Client",
      ipHash,
    });

    return NextResponse.json({
      success: true,
      messageId: saved.id,
      timestamp: saved.timestamp,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
