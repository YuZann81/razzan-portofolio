"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import { useSoundFX } from "@/hooks/useSoundFX";
import { useTheme } from "@/hooks/useTheme";

export default function NavbarWrapper() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { isMuted, toggleMute } = useSoundFX();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isMuted={isMuted}
        toggleMute={toggleMute}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        isMuted={isMuted}
        toggleMute={toggleMute}
        theme={theme}
        toggleTheme={toggleTheme}
        onReplayBoot={() => {}}
      />
    </>
  );
}
