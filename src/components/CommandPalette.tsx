"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  ArrowRight,
  Volume2,
  VolumeX,
  Mail,
  X,
  Sun,
  Moon,
  Play,
  Check,
  FolderGit2,
  Shield,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { useSoundFX } from "../hooks/useSoundFX";
import { ThemeMode } from "../hooks/useTheme";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  onReplayBoot: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  isMuted,
  toggleMute,
  theme,
  toggleTheme,
  onReplayBoot,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playClick, playHover, playSuccess } = useSoundFX();

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const actions = [
    {
      id: "nav-all-projects",
      label: "Open Full Projects Catalog (/project)",
      category: "Navigation",
      shortcut: "G P",
      icon: FolderGit2,
      action: () => {
        handleClose();
        router.push("/project");
      },
    },
    {
      id: "nav-admin",
      label: "Open Admin Panel & Analytics (/admin)",
      category: "System",
      shortcut: "G M",
      icon: Shield,
      action: () => {
        handleClose();
        router.push("/admin");
      },
    },
    {
      id: "nav-about",
      label: "Jump to About & Profile",
      category: "Navigation",
      shortcut: "G A",
      icon: ArrowRight,
      action: () => {
        const el = document.getElementById("about");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#about");
        }
        handleClose();
      },
    },
    {
      id: "nav-works",
      label: "Jump to Works & Case Studies",
      category: "Navigation",
      shortcut: "G W",
      icon: ArrowRight,
      action: () => {
        const el = document.getElementById("works");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#works");
        }
        handleClose();
      },
    },
    {
      id: "nav-services",
      label: "Jump to Capabilities & Services",
      category: "Navigation",
      shortcut: "G S",
      icon: ArrowRight,
      action: () => {
        const el = document.getElementById("services");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#services");
        }
        handleClose();
      },
    },
    {
      id: "nav-contact",
      label: "Jump to Contact Terminal",
      category: "Navigation",
      shortcut: "G C",
      icon: ArrowRight,
      action: () => {
        const el = document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#contact");
        }
        handleClose();
      },
    },
    {
      id: "theme-toggle",
      label: `Switch Theme (${theme === "light" ? "Dark" : "Light"} Mode)`,
      category: "Settings",
      shortcut: "T",
      icon: theme === "light" ? Moon : Sun,
      action: () => {
        toggleTheme();
        handleClose();
      },
    },
    {
      id: "replay-boot",
      label: "Replay Retro CRT Boot Sequence",
      category: "System",
      shortcut: "BOOT",
      icon: Play,
      action: () => {
        handleClose();
        onReplayBoot();
      },
    },
    {
      id: "copy-email",
      label: "Copy Email Address (razzan.gianni@gmail.com)",
      category: "Action",
      shortcut: "⌘ C",
      icon: copiedToast ? Check : Mail,
      action: () => {
        navigator.clipboard.writeText("razzan.gianni@gmail.com");
        playSuccess();
        setCopiedToast(true);
        setTimeout(() => {
          setCopiedToast(false);
          handleClose();
        }, 800);
      },
    },
    {
      id: "toggle-sfx",
      label: isMuted ? "Enable Sound Feedback" : "Mute Sound Feedback",
      category: "Settings",
      shortcut: "M",
      icon: isMuted ? VolumeX : Volume2,
      action: () => {
        toggleMute();
        handleClose();
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile (@YuZann81)",
      category: "External",
      shortcut: "GH",
      icon: GithubIcon,
      action: () => {
        window.open("https://github.com/YuZann81", "_blank");
        handleClose();
      },
    },
  ];

  const filtered = actions.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        playHover();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        playHover();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          playClick();
          filtered[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, playClick, playHover, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 pt-24 px-4 backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl border border-theme-accent bg-theme-card shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: "0px" }}
      >
        {/* Toast confirmation */}
        {copiedToast && (
          <div className="border-b border-theme-accent bg-theme-sec px-4 py-2 font-mono text-xs text-emerald-500 flex items-center justify-between">
            <span>✓ Email address copied to clipboard!</span>
          </div>
        )}

        {/* Search header */}
        <div className="flex items-center gap-3 border-b border-theme px-4 py-3">
          <Search className="h-4 w-4 text-theme-dim" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a section, project, or command (e.g. project, admin, theme)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent font-mono text-sm text-theme-fg placeholder:text-theme-dim outline-none"
          />
          <button
            onClick={handleClose}
            className="text-theme-dim hover:text-theme-fg cursor-pointer"
            aria-label="Close Command Palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action list */}
        <div className="max-h-80 overflow-y-auto p-2 font-mono text-xs">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-theme-dim">No matching items found.</div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClick();
                    item.action();
                  }}
                  onMouseEnter={() => {
                    setSelectedIndex(index);
                    playHover();
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-theme-accent text-white font-semibold"
                      : "text-theme-fg hover:bg-theme-sec"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`h-3.5 w-3.5 ${isSelected ? "text-white" : "text-theme-accent"}`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] ${isSelected ? "text-white/80" : "text-theme-dim"}`}
                    >
                      {item.category}
                    </span>
                    <kbd
                      className={`border px-1.5 py-0.5 text-[10px] ${
                        isSelected
                          ? "border-white/40 bg-white/20 text-white"
                          : "border-theme bg-theme-sec text-theme-muted"
                      }`}
                    >
                      {item.shortcut}
                    </kbd>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-theme bg-theme-sec px-4 py-2 text-[11px] font-mono text-theme-dim">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>K Quick Menu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
