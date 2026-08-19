"use client";

import { useSyncExternalStore, useRef, useCallback } from "react";

function subscribeSound(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("razzan_sfx_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("razzan_sfx_change", callback);
  };
}

function getSoundSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("razzan_sfx_muted") === "true";
}

function getServerSoundSnapshot(): boolean {
  return false;
}

// Web Audio API synthesizer for instant, zero-latency micro-interactions
export function useSoundFX() {
  const isMuted = useSyncExternalStore(
    subscribeSound,
    getSoundSnapshot,
    getServerSoundSnapshot
  );

  const audioCtxRef = useRef<AudioContext | null>(null);

  const toggleMute = useCallback(() => {
    const next = !getSoundSnapshot();
    localStorage.setItem("razzan_sfx_muted", String(next));
    window.dispatchEvent(new Event("razzan_sfx_change"));
  }, []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Subtle mechanical / digital click
  const playClick = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext might be blocked before user interaction
    }
  }, [isMuted, getAudioContext]);

  // High-frequency subtle hover blip
  const playHover = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // Ignore
    }
  }, [isMuted, getAudioContext]);

  // Terminal confirm beep
  const playSuccess = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);
      osc.frequency.setValueAtTime(783.99, now + 0.12);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }, [isMuted, getAudioContext]);

  return { isMuted, toggleMute, playClick, playHover, playSuccess };
}
