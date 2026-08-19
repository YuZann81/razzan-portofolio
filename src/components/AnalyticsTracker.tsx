"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    let slug: string | undefined;
    if (pathname.startsWith("/project/")) {
      slug = pathname.replace("/project/", "");
    }

    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          slug,
          referrer: typeof document !== "undefined" ? document.referrer || "Direct" : "Direct",
        }),
      }).catch(() => {
        // Silent fail for offline/local
      });
    } catch {
      // Ignore
    }
  }, [pathname]);

  return null;
}
