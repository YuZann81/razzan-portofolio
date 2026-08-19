"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowDownRight, Copy, Check, Terminal, ExternalLink, Activity, Sparkles } from "lucide-react";
import { useSoundFX } from "../hooks/useSoundFX";
import confetti from "canvas-confetti";
import AnimateOnScroll from "./AnimateOnScroll";
import DigitalAuroraCanvas from "./DigitalAuroraCanvas";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [liveTime, setLiveTime] = useState<string>("");
  const { playHover, playClick, playSuccess } = useSoundFX();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("razzan.gianni@gmail.com");
    setCopied(true);
    playSuccess();

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ["#0000EE", "#0066FF", "#FFFFFF"],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-[95vh] w-full flex flex-col justify-between border-b border-theme bg-theme overflow-hidden pt-20 sm:pt-28">
      {/* Dynamic Digital Aurora & Flowing Celestial Waves */}
      <DigitalAuroraCanvas />

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 my-auto py-12 sm:py-20">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Top Status & Live Telemetry Badge */}
          <AnimateOnScroll direction="up" delay={50}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-[11px] sm:text-xs">
              <div className="inline-flex items-center gap-2 border border-theme bg-theme-card/80 px-3 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066ff] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0066ff]"></span>
                </span>
                <span className="font-semibold text-theme-fg tracking-wide uppercase">
                  AVAILABLE FOR CONTRACTS &amp; ROLES
                </span>
              </div>

              {liveTime && (
                <div className="hidden sm:inline-flex items-center gap-1.5 border border-theme bg-theme-sec/80 px-3 py-1.5 text-theme-muted backdrop-blur-md">
                  <Activity className="h-3 w-3 text-theme-accent" />
                  <span>JAKARTA (UTC+7) // {liveTime} WIB</span>
                </div>
              )}
            </div>
          </AnimateOnScroll>

          {/* Masterclass Elegant Name & Headline Typography */}
          <AnimateOnScroll direction="up" delay={150}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-theme-dim tracking-widest uppercase">
                <Sparkles className="h-3.5 w-3.5 text-theme-accent" />
                <span>SOFTWARE ENGINEER &amp; SYSTEMS ARCHITECT</span>
              </div>

              {/* Elegant Haute-Couture Name Header */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-theme-fg leading-[1.02]">
                Razzan <span className="font-serif italic font-normal text-theme-accent">Gianni</span>
              </h1>

              {/* Subtitle Statement */}
              <p className="text-xl sm:text-3xl md:text-4xl font-normal text-theme-muted tracking-tight pt-1 leading-snug">
                Architecting <span className="font-serif italic font-normal text-theme-fg">high-throughput distributed systems</span> &amp;{" "}
                <span className="font-serif italic font-normal text-theme-fg">high-precision</span> web platforms.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Core Technical Stance */}
          <AnimateOnScroll direction="up" delay={250}>
            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-theme-muted font-sans leading-relaxed">
              Specializing in <span className="text-theme-fg font-medium">zero-allocation data pipelines</span>, low-latency microservices (Go, Rust, TypeScript), and sensory web interfaces designed with uncompromising mathematical restraint.
            </p>
          </AnimateOnScroll>

          {/* Action Hub */}
          <AnimateOnScroll direction="up" delay={350}>
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <a
                href="#works"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="flex items-center gap-2 border border-theme bg-theme-fg px-5 py-3.5 uppercase tracking-wider text-theme-card font-semibold transition-all hover:bg-theme-accent hover:border-theme-accent cursor-pointer shadow-sm"
                style={{ borderRadius: "0px" }}
              >
                <span>Explore Works</span>
                <ArrowDownRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#about"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="flex items-center gap-2 border border-theme bg-theme-card px-5 py-3.5 uppercase tracking-wider text-theme-fg font-semibold transition-colors hover:border-theme-fg cursor-pointer"
                style={{ borderRadius: "0px" }}
              >
                <span>Profile &amp; Arsenal</span>
                <ArrowDownRight className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={copyEmail}
                onMouseEnter={() => playHover()}
                className="flex items-center gap-2 border border-theme bg-theme-sec px-4 py-3.5 text-theme-muted transition-colors hover:text-theme-fg hover:border-theme-fg cursor-pointer"
                style={{ borderRadius: "0px" }}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
              </button>

              <Link
                href="/project"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="hidden sm:flex items-center gap-1.5 border border-theme bg-theme-sec px-4 py-3.5 text-theme-muted hover:text-theme-fg hover:border-theme-fg transition-colors"
                style={{ borderRadius: "0px" }}
              >
                <span>Full Catalog</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Bottom Engineering Telemetry HUD Strip */}
      <div className="relative z-10 border-t border-theme bg-theme-sec/90 backdrop-blur-md py-3 sm:py-3.5 font-mono text-xs">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 text-theme-muted text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <Terminal className="h-3.5 w-3.5 text-theme-accent" />
            <span className="font-semibold text-theme-fg">CORE ARSENAL:</span>
            <span>Go • Rust • TypeScript • Next.js 16 • PostgreSQL • Redis • Kafka</span>
          </div>

          <div className="flex items-center gap-4 text-theme-dim">
            <span>TARGET: p99 &lt; 2.0ms</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">SYSTEM: 100% DETERMINISTIC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
