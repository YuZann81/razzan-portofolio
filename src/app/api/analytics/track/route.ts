import { NextResponse } from "next/server";
import { recordPageView } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, slug, referrer } = body;

    const userAgent = request.headers.get("user-agent") || "unknown";
    const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);

    const device: "desktop" | "mobile" | "tablet" = isTablet
      ? "tablet"
      : isMobile
      ? "mobile"
      : "desktop";

    let browser = "Unknown";
    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Edge")) browser = "Edge";

    // Lightweight IP hash (privacy-friendly, zero raw IP stored)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
    let ipHash = 0;
    for (let i = 0; i < ip.length; i++) {
      ipHash = (ipHash << 5) - ipHash + ip.charCodeAt(i);
      ipHash |= 0;
    }

    const recorded = recordPageView({
      path: path || "/",
      slug: slug || undefined,
      referrer: referrer || "Direct",
      userAgent: userAgent.substring(0, 100),
      device,
      browser,
      ipHash: "u_" + Math.abs(ipHash).toString(36),
    });

    return NextResponse.json({ success: true, eventId: recorded.id });
  } catch {
    return NextResponse.json({ success: false, error: "Tracking error" }, { status: 500 });
  }
}
