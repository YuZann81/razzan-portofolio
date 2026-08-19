"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSoundFX } from "../hooks/useSoundFX";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [percent, setPercent] = useState(0);
  const [isLifting, setIsLifting] = useState(false);
  const { playSuccess } = useSoundFX();
  const hasFinishedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsLifting(true);

    try {
      playSuccess();
    } catch {
      // Ignore
    }

    setTimeout(() => {
      onComplete();
    }, 550);
  }, [onComplete, playSuccess]);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 600; // 600ms total progress

    let rafId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const currentVal = Math.floor(progress * 100);

      setPercent(currentVal);

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      } else {
        handleFinish();
      }
    };

    rafId = requestAnimationFrame(update);

    // Hard timeout fallback: guarantee exit after 750ms
    const timer = setTimeout(handleFinish, 750);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFinish]);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#080808] p-6 sm:p-12 text-[#f4f4f5] select-none cursor-pointer overflow-hidden transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isLifting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      {/* Top Header info */}
      <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 border-b border-neutral-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0066ff] animate-pulse" />
          <span className="text-neutral-300 font-semibold tracking-wider">RAZZAN.SITE // 2026</span>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-neutral-500">
          [SPACE / CLICK TO ENTER]
        </div>
      </div>

      {/* Center Cinematic Signature */}
      <div className="mx-auto flex flex-col items-center text-center my-auto">
        <div className="overflow-hidden">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white animate-in fade-in slide-in-from-bottom-3 duration-500">
            Razzan <span className="font-serif italic font-normal text-theme-accent">Gianni</span>
          </h1>
        </div>

        <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-400 tracking-widest uppercase animate-in fade-in duration-700 delay-150">
          Software Engineering <span className="text-neutral-600">{"//"}</span> System Architect
        </p>

        {/* Counter & Minimal Progress Hairline */}
        <div className="mt-8 sm:mt-10 w-48 sm:w-64">
          <div className="flex justify-between font-mono text-xs text-neutral-400 mb-2">
            <span className="text-[10px] tracking-wider text-neutral-500">INITIALIZING</span>
            <span className="font-bold text-white font-mono">{percent}%</span>
          </div>
          <div className="h-[2px] w-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-[#0066ff] transition-all duration-75 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer details */}
      <div className="flex items-center justify-between font-mono text-[10px] text-neutral-600 border-t border-neutral-800/80 pt-4">
        <span>JAKARTA (UTC+7)</span>
        <span className="text-neutral-400">HIGH-THROUGHPUT ARCHITECTURE</span>
      </div>
    </div>
  );
}
