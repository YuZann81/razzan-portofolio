import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const correctPin = process.env.ADMIN_PIN || "razzan2026";

    if (pin === correctPin) {
      return NextResponse.json({ success: true, token: "session_" + Date.now() });
    }

    return NextResponse.json({ success: false, error: "Invalid PIN code." }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: "Authentication failed." }, { status: 500 });
  }
}
