"use client";

import { useSyncExternalStore, useCallback, useEffect } from "react";

export type ThemeMode = "light" | "dark";

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("razzan_theme_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("razzan_theme_change", callback);
  };
}

function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("razzan_theme") as ThemeMode) || "light";
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

function applyThemeToDOM(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    localStorage.setItem("razzan_theme", mode);
    applyThemeToDOM(mode);
    window.dispatchEvent(new Event("razzan_theme_change"));
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    const next: ThemeMode = current === "light" ? "dark" : "light";
    localStorage.setItem("razzan_theme", next);
    applyThemeToDOM(next);
    window.dispatchEvent(new Event("razzan_theme_change"));
  }, []);

  return { theme, setTheme, toggleTheme };
}
