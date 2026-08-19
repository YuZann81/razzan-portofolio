"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Works from "../components/Works";
import Services from "../components/Services";
import Approach from "../components/Approach";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";
import SplashScreen from "../components/SplashScreen";
import SmoothScroll from "../components/SmoothScroll";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { useSoundFX } from "../hooks/useSoundFX";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { isMuted, toggleMute } = useSoundFX();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleReplayBoot = () => {
    setShowSplash(true);
  };

  return (
    <SmoothScroll>
      <AnalyticsTracker />
      {/* Masterclass Kinetic Curtain Preloader */}
      {showSplash && (
        <SplashScreen
          onComplete={() => {
            setShowSplash(false);
          }}
        />
      )}

      <div className="relative min-h-screen w-full bg-theme text-theme-fg selection:bg-theme-accent selection:text-white transition-colors">
        {/* Navigation Bar */}
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          isMuted={isMuted}
          toggleMute={toggleMute}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Core Portfolio Sections in Sequence: Hero -> About -> Works -> Services -> Approach -> Contact */}
        <main className="w-full">
          <Hero />
          <About />
          <Works />
          <Services />
          <Approach />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Command Palette (⌘K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          isMuted={isMuted}
          toggleMute={toggleMute}
          theme={theme}
          toggleTheme={toggleTheme}
          onReplayBoot={handleReplayBoot}
        />
      </div>
    </SmoothScroll>
  );
}
