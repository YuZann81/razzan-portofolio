"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import SmoothScroll from "@/components/SmoothScroll";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Project, PROJECTS as STATIC_PROJECTS } from "@/data/works";
import { useSoundFX } from "@/hooks/useSoundFX";
import { useTheme } from "@/hooks/useTheme";
import { Search, ArrowLeft, ArrowUpRight, Layers, Table } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const { isMuted, toggleMute, playHover, playClick } = useSoundFX();
  const { theme, toggleTheme } = useTheme();

  // Load dynamically from backend API if available
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch(() => {
        // Fallback to static
      });
  }, []);

  const categories = ["All", "Systems & Infrastructure", "Full Stack", "AI & Cloud", "Open Source"];

  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchTag = !selectedTag || p.tags.includes(selectedTag);
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchTag && matchSearch;
    });
  }, [projects, selectedCategory, selectedTag, searchQuery]);

  return (
    <SmoothScroll>
      <AnalyticsTracker />
      <div className="relative min-h-screen w-full bg-theme text-theme-fg selection:bg-theme-accent selection:text-white transition-colors">
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          isMuted={isMuted}
          toggleMute={toggleMute}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-theme-muted">
            <Link
              href="/"
              onClick={() => playClick()}
              className="flex items-center gap-1 hover:text-theme-fg transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>HOME</span>
            </Link>
            <span className="text-theme-dim">/</span>
            <span className="text-theme-fg">PROJECTS ARCHIVE</span>
          </div>

          {/* Header */}
          <AnimateOnScroll direction="up">
            <div className="flex flex-col justify-between gap-4 border-b border-theme pb-8 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-theme-muted">
                  <span>[CATALOG]</span>
                  <span className="uppercase tracking-wider">ALL PRODUCTION SYSTEMS</span>
                </div>
                <h1 className="mt-2 text-3xl sm:text-5xl font-normal tracking-tight text-theme-fg">
                  Complete Project <span className="font-serif italic font-normal text-theme-muted">Index</span>
                </h1>
                <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-theme-muted">
                  Comprehensive archive of open-source architectures, distributed engines, and production web applications.
                </p>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-2 font-mono text-xs self-start md:self-auto">
                <button
                  onClick={() => {
                    playClick();
                    setViewMode("grid");
                  }}
                  className={`flex items-center gap-1.5 border px-3 py-1.5 transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "border-theme-fg bg-theme-fg text-theme-card font-medium"
                      : "border-theme bg-theme-card text-theme-muted hover:border-theme-fg"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setViewMode("table");
                  }}
                  className={`flex items-center gap-1.5 border px-3 py-1.5 transition-colors cursor-pointer ${
                    viewMode === "table"
                      ? "border-theme-fg bg-theme-fg text-theme-card font-medium"
                      : "border-theme bg-theme-card text-theme-muted hover:border-theme-fg"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <Table className="h-3.5 w-3.5" />
                  <span>Index Table</span>
                </button>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Search & Filter Toolbar */}
          <div className="my-8 space-y-4 font-mono text-xs">
            {/* Search Bar */}
            <div className="relative border border-theme bg-theme-card">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-dim" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by keyword, tech stack, or problem statement..."
                className="w-full bg-transparent py-3 pl-10 pr-4 font-mono text-xs sm:text-sm text-theme-fg placeholder:text-theme-dim outline-none"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`border px-3 py-1 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "border-theme-fg bg-theme-fg text-theme-card font-bold"
                      : "border-theme bg-theme-card text-theme-muted hover:border-theme-fg"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tech Stack Filter Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-theme-dim text-[11px] mr-1">Tech Filter:</span>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="border border-theme-accent bg-theme-accent/10 px-2 py-0.5 text-[10px] text-theme-accent cursor-pointer"
                >
                  Clear ({selectedTag}) ✕
                </button>
              )}
              {allTags.slice(0, 10).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    playClick();
                    setSelectedTag(selectedTag === tag ? null : tag);
                  }}
                  className={`border px-2 py-0.5 text-[10px] transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? "border-theme-fg bg-theme-fg text-theme-card font-bold"
                      : "border-theme bg-theme-sec text-theme-muted hover:border-theme-fg"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Project List / Grid */}
          {filteredProjects.length === 0 ? (
            <div className="border border-theme bg-theme-card p-12 text-center font-mono text-xs text-theme-dim">
              No projects matching your search filter.
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredProjects.map((project, idx) => (
                <AnimateOnScroll key={project.id} direction="up" delay={idx * 80}>
                  <div
                    onMouseEnter={() => playHover()}
                    className="group relative border border-theme bg-theme-card p-5 sm:p-6 transition-all hover:border-theme-fg hover:shadow-lg h-full flex flex-col justify-between"
                    style={{ borderRadius: "0px" }}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-theme pb-3 font-mono text-xs text-theme-dim">
                        <span>SYS // 0{idx + 1}</span>
                        <span className="text-theme-accent font-semibold">{project.year}</span>
                      </div>

                      <div className="mt-4">
                        <span className="border border-theme bg-theme-sec px-2 py-0.5 font-mono text-[10px] text-theme-muted">
                          {project.category}
                        </span>
                        <Link
                          href={`/project/${project.slug}`}
                          onClick={() => playClick()}
                          className="block mt-2"
                        >
                          <h3 className="text-xl font-medium text-theme-fg group-hover:text-theme-accent transition-colors flex items-center justify-between">
                            <span>{project.title}</span>
                            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                        </Link>
                        <p className="mt-2 text-xs sm:text-sm text-theme-muted leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      {/* Metrics Pill */}
                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-theme pt-4 font-mono text-xs">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="text-[10px] text-theme-dim uppercase">{m.label}</div>
                            <div className="mt-0.5 font-semibold text-theme-fg text-xs sm:text-sm">{m.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tags & Action Links */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-theme font-mono text-xs">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-theme bg-theme-sec px-1.5 py-0.5 text-[10px] text-theme-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/project/${project.slug}`}
                          onClick={() => playClick()}
                          className="text-theme-accent hover:underline text-[11px] font-semibold"
                        >
                          Case Study →
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="border border-theme bg-theme-card overflow-x-auto">
              <div className="min-w-[650px] grid grid-cols-12 border-b border-theme bg-theme-sec px-4 py-3 font-mono text-xs text-theme-dim">
                <div className="col-span-1">#</div>
                <div className="col-span-4">PROJECT</div>
                <div className="col-span-3">CATEGORY</div>
                <div className="col-span-2">ROLE</div>
                <div className="col-span-2 text-right">YEAR / DETAILS</div>
              </div>

              <div className="min-w-[650px] divide-y divide-theme">
                {filteredProjects.map((project, idx) => (
                  <Link
                    key={project.id}
                    href={`/project/${project.slug}`}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="group grid grid-cols-12 items-center px-4 py-4 font-mono text-xs transition-colors hover:bg-theme-sec cursor-pointer"
                  >
                    <div className="col-span-1 text-theme-dim group-hover:text-theme-fg">
                      0{idx + 1}
                    </div>
                    <div className="col-span-4 font-sans">
                      <span className="text-base font-medium text-theme-fg group-hover:text-theme-accent transition-colors">
                        {project.title}
                      </span>
                      <p className="font-mono text-[11px] text-theme-dim line-clamp-1">{project.subtitle}</p>
                    </div>
                    <div className="col-span-3 text-theme-muted">
                      <span className="border border-theme bg-theme-sec px-2 py-0.5 text-[11px]">
                        {project.category}
                      </span>
                    </div>
                    <div className="col-span-2 text-theme-muted text-xs">
                      {project.role}
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-1.5 text-right font-mono">
                      <span className="text-theme-dim">{project.year}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-theme-dim group-hover:text-theme-accent transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />

        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          isMuted={isMuted}
          toggleMute={toggleMute}
          theme={theme}
          toggleTheme={toggleTheme}
          onReplayBoot={() => {}}
        />
      </div>
    </SmoothScroll>
  );
}
