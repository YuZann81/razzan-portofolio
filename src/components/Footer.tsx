"use client";

import Link from "next/link";
import { ArrowUp, Terminal } from "lucide-react";
import { useSoundFX } from "../hooks/useSoundFX";

export default function Footer() {
  const { playHover, playClick } = useSoundFX();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-theme bg-theme-sec py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Left Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-theme-fg">
              <Terminal className="h-4 w-4 text-theme-accent" />
              <span>RAZZAN GIANNI</span>
            </div>
            <p className="font-mono text-xs text-theme-dim">
              Software Engineer &amp; Systems Architect // High-precision engineering &amp; distributed runtimes.
            </p>
          </div>

          {/* Center Stack spec */}
          <div className="font-mono text-xs text-theme-muted">
            <span className="text-theme-dim">Built with: </span>
            <span className="text-theme-fg">Next.js 16</span> •{" "}
            <span className="text-theme-fg">React 19</span> •{" "}
            <span className="text-theme-fg">Tailwind v4</span> •{" "}
            <span className="text-theme-fg">TypeScript</span>
          </div>

          {/* Right Action */}
          <div>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => playHover()}
              className="flex items-center gap-2 border border-theme bg-theme-card px-4 py-2 font-mono text-xs text-theme-fg transition-all hover:bg-theme-fg hover:text-theme-card cursor-pointer"
              style={{ borderRadius: "0px" }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-theme pt-6 flex flex-col justify-between gap-4 font-mono text-[11px] text-theme-dim sm:flex-row">
          <div suppressHydrationWarning>© {new Date().getFullYear()} RAZZAN GIANNI. ALL RIGHTS RESERVED.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/project" className="hover:text-theme-fg transition-colors">
              CATALOG (/project)
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-theme-fg transition-colors">
              ADMIN (/admin)
            </Link>
            <span>•</span>
            <a
              href="https://github.com/YuZann81"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-theme-accent transition-colors"
            >
              GITHUB (@YuZann81)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
