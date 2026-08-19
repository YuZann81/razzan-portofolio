import { NextResponse } from "next/server";
import { getAnalyticsSummary, clearAnalytics } from "@/lib/db";

export async function GET() {
  try {
    const summary = getAnalyticsSummary();
    return NextResponse.json({ success: true, data: summary });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load analytics" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    clearAnalytics();
    return NextResponse.json({ success: true, message: "Analytics telemetry reset." });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to clear analytics" }, { status: 500 });
  }
}
