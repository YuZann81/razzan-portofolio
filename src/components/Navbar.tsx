"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Terminal, Sun, Moon, Menu, X } from "lucide-react";
import { useSoundFX } from "../hooks/useSoundFX";
import { ThemeMode } from "../hooks/useTheme";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

export default function Navbar({
  onOpenCommandPalette,
  isMuted,
  toggleMute,
  theme,
  toggleTheme,
}: NavbarProps) {
  const { playHover, playClick } = useSoundFX();
  const [time, setTime] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["works", "about", "services", "approach", "contact"];
      const scrollY = window.scrollY;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 150;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "about", href: "/#about" },
    { label: "works", href: "/#works" },
    { label: "catalog", href: "/project" },
    { label: "services", href: "/#services" },
    { label: "approach", href: "/#approach" },
    { label: "contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-theme bg-theme/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5 sm:px-6 lg:px-10">
        {/* Brand & System Status HUD */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-theme-fg hover:text-theme-accent transition-colors"
          >
            RAZZAN GIANNI
          </Link>

          <div className="hidden items-center gap-2 border-l border-theme pl-3 font-mono text-xs text-theme-muted sm:flex">
            <span className="flex items-center gap-1.5 text-theme-fg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0000ee] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0000ee]"></span>
              </span>
              AVAILABLE
            </span>
            <span className="text-theme-dim">/</span>
            <span className="text-theme-dim">JKT {time ? `${time} UTC+7` : "--:--:--"}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.label;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className={`px-3 py-1 font-mono text-xs lowercase transition-colors cursor-pointer ${
                  isActive
                    ? "text-theme-accent font-semibold underline underline-offset-4"
                    : "text-theme-dim hover:text-theme-fg"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={() => {
              toggleTheme();
              playClick();
            }}
            onMouseEnter={() => playHover()}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            className="flex h-8 w-8 items-center justify-center border border-theme text-theme-muted transition-colors hover:border-theme-accent hover:text-theme-accent cursor-pointer"
            style={{ borderRadius: "0px" }}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              toggleMute();
              playClick();
            }}
            onMouseEnter={() => playHover()}
            title={isMuted ? "Sound muted" : "Sound enabled"}
            className="flex h-8 w-8 items-center justify-center border border-theme text-theme-muted transition-colors hover:border-theme-accent hover:text-theme-accent cursor-pointer"
            style={{ borderRadius: "0px" }}
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={() => playHover()}
            className="flex h-8 items-center gap-1.5 border border-theme bg-theme-fg px-2.5 font-mono text-xs text-theme-card transition-all hover:bg-theme-accent hover:border-theme-accent cursor-pointer"
            style={{ borderRadius: "0px" }}
            aria-label="Open Command Menu (⌘K)"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => {
              playClick();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            className="flex h-8 w-8 items-center justify-center border border-theme text-theme-fg md:hidden cursor-pointer"
            style={{ borderRadius: "0px" }}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-theme bg-theme-card px-6 py-5 md:hidden font-mono text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    playClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-2.5 border-b border-theme/50 transition-colors ${
                    isActive ? "text-theme-accent font-bold" : "text-theme-muted"
                  }`}
                >
                  <span className="uppercase tracking-wider">{link.label}</span>
                  <span className="text-theme-dim">→</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 text-theme-dim text-[11px]">
            <span>JAKARTA {time ? `${time} UTC+7` : "--:--:--"}</span>
            <span className="text-theme-accent font-bold">AVAILABLE</span>
          </div>
        </div>
      )}
    </header>
  );
}
