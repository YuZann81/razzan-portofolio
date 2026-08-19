import { NextResponse } from "next/server";
import { getAdminPin, updateAdminPin } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const currentMasterPin = getAdminPin();

    if (!authHeader || authHeader !== `Bearer ${currentMasterPin}`) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPin, newPin } = body;

    if (!currentPin || currentPin !== currentMasterPin) {
      return NextResponse.json(
        { success: false, error: "Current Master PIN is incorrect." },
        { status: 400 }
      );
    }

    if (!newPin || String(newPin).length < 6) {
      return NextResponse.json(
        { success: false, error: "New PIN must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const ok = updateAdminPin(String(newPin).trim());
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Failed to update Master PIN in settings storage." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Master PIN updated successfully.",
      newToken: newPin,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
