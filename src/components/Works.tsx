"use client";

import { useState, useRef } from "react";
import { PROJECTS, Project } from "../data/works";
import { ExternalLink, ArrowUpRight, Layers, Table, X, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useSoundFX } from "../hooks/useSoundFX";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const { playHover, playClick, playSuccess } = useSoundFX();
  const tableRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Systems & Infrastructure", "Full Stack", "AI & Cloud", "Open Source"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cardWidth = 280;
    const cardHeight = 150;

    // Position tightly next to cursor within the table bounds
    let x = mouseX + 16;
    let y = mouseY - 20;

    // Flip to left of cursor if near right edge
    if (x + cardWidth > rect.width - 12) {
      x = mouseX - cardWidth - 16;
    }
    if (x < 8) x = 8;

    // Clamp vertically within table height
    if (y < 8) y = 8;
    if (y + cardHeight > rect.height - 8) {
      y = rect.height - cardHeight - 8;
    }

    setMousePos({ x, y });
  };

  return (
    <section id="works" className="relative w-full border-b border-theme bg-theme py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="flex flex-col justify-between gap-4 border-b border-theme pb-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-theme-muted">
                <span>[02]</span>
                <span className="uppercase tracking-wider">SELECTED WORKS & ARCHIVES</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-theme-fg">
                Production Systems &amp;{" "}
                <span className="font-serif italic font-normal text-theme-muted">Case Studies</span>
              </h2>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 font-mono text-xs self-start md:self-auto">
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
                <span>Index View</span>
              </button>
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
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Category Filters */}
        <AnimateOnScroll direction="up" delay={100}>
          <div className="my-6 sm:my-8 flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => playHover()}
                  className={`border px-3 py-1 sm:px-3.5 sm:py-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-theme-fg bg-theme-fg text-theme-card font-bold"
                      : "border-theme bg-theme-card text-theme-muted hover:border-theme-fg hover:text-theme-fg"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </AnimateOnScroll>

        {/* --- VIEW MODE 1: INDEX VIEW --- */}
        {viewMode === "table" && (
          <AnimateOnScroll direction="up" delay={200}>
            {/* Desktop Table with Cursor Tracking Hover Preview */}
            <div
              ref={tableRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative hidden md:block border border-theme bg-theme-card"
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 border-b border-theme bg-theme-sec px-4 py-3 font-mono text-xs text-theme-dim">
                <div className="col-span-1">#</div>
                <div className="col-span-4">PROJECT</div>
                <div className="col-span-3">CATEGORY</div>
                <div className="col-span-2">ROLE</div>
                <div className="col-span-2 text-right">YEAR / INSPECT</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-theme">
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      playSuccess();
                      setActiveProject(project);
                    }}
                    onMouseEnter={(e) => {
                      playHover();
                      setHoveredProject(project);
                      handleMouseMove(e);
                    }}
                    className="group grid grid-cols-12 items-center px-4 py-4 sm:py-5 font-mono text-xs transition-colors hover:bg-theme-sec cursor-pointer"
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
                      <ArrowUpRight className="h-3.5 w-3.5 text-theme-dim group-hover:text-theme-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tightly Attached Floating Preview Thumbnail */}
              {hoveredProject && (
                <div
                  className="pointer-events-none absolute z-30 w-72 border border-theme bg-theme-card p-4 shadow-xl transition-all duration-75"
                  style={{
                    top: `${mousePos.y}px`,
                    left: `${mousePos.x}px`,
                    borderRadius: "0px",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-theme pb-2 font-mono text-[10px] text-theme-dim">
                    <span>PREVIEW_CARD</span>
                    <span className="text-theme-accent font-medium">{hoveredProject.year}</span>
                  </div>
                  <div className="mt-2.5">
                    <h4 className="font-medium text-sm text-theme-fg">{hoveredProject.title}</h4>
                    <p className="mt-1 font-mono text-xs text-theme-muted leading-relaxed line-clamp-2">
                      {hoveredProject.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {hoveredProject.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="border border-theme bg-theme-sec px-1.5 py-0.5 font-mono text-[10px] text-theme-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile / Tablet Responsive Stack Cards */}
            <div className="md:hidden space-y-3">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => {
                    playSuccess();
                    setActiveProject(project);
                  }}
                  className="border border-theme bg-theme-card p-4 transition-colors hover:border-theme-fg cursor-pointer active:bg-theme-sec"
                  style={{ borderRadius: "0px" }}
                >
                  <div className="flex items-center justify-between font-mono text-xs text-theme-dim border-b border-theme pb-2">
                    <span className="text-theme-fg font-bold">0{idx + 1} {"//"} {project.year}</span>
                    <span className="border border-theme bg-theme-sec px-2 py-0.5 text-[10px] text-theme-muted">
                      {project.category}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-base font-medium text-theme-fg flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="h-4 w-4 text-theme-dim" />
                    </h3>
                    <p className="mt-1 font-mono text-xs text-theme-muted">{project.subtitle}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-theme font-mono text-[11px] text-theme-dim">
                    <span>{project.role}</span>
                    <span className="text-theme-accent">Tap to inspect ↵</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* --- VIEW MODE 2: DETAILED MATRIX GRID --- */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <AnimateOnScroll key={project.id} direction="up" delay={idx * 100}>
                <div
                  onClick={() => {
                    playSuccess();
                    setActiveProject(project);
                  }}
                  onMouseEnter={() => playHover()}
                  className="group relative border border-theme bg-theme-card p-5 sm:p-6 transition-all hover:border-theme-fg hover:shadow-lg cursor-pointer h-full flex flex-col justify-between"
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
                      <h3 className="mt-2 text-lg sm:text-xl font-medium text-theme-fg group-hover:text-theme-accent transition-colors">
                        {project.title}
                      </h3>
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

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-theme bg-theme-sec px-2 py-0.5 font-mono text-[10px] text-theme-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>

      {/* --- INTERACTIVE PROJECT INSPECTOR MODAL --- */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-theme bg-theme-card p-5 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: "0px" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-theme pb-3 sm:pb-4">
              <div className="font-mono text-xs text-theme-accent">
                PROJECT_SPEC // {activeProject.id}
              </div>
              <button
                onClick={() => {
                  playClick();
                  setActiveProject(null);
                }}
                className="p-1 text-theme-dim hover:text-theme-fg cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-5 sm:mt-6">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs">
                <span className="bg-theme-fg px-2 py-0.5 text-theme-card">{activeProject.category}</span>
                <span className="text-theme-dim">/</span>
                <span className="text-theme-muted">{activeProject.role}</span>
                <span className="text-theme-dim">/</span>
                <span className="text-theme-dim">{activeProject.year}</span>
              </div>

              <h3 className="mt-3 text-xl sm:text-3xl font-medium text-theme-fg">
                {activeProject.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-theme-muted font-mono">{activeProject.subtitle}</p>

              <div className="mt-5 border-t border-theme pt-4">
                <h4 className="font-mono text-xs font-semibold text-theme-fg uppercase tracking-wider">
                  {"// ARCHITECTURE & PROBLEM STATEMENT"}
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-theme-muted">
                  {activeProject.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="mt-5 border-t border-theme pt-4">
                <h4 className="font-mono text-xs font-semibold text-theme-fg uppercase tracking-wider">
                  {"// ENGINEERING HIGHLIGHTS"}
                </h4>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-theme-muted">
                  {activeProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benchmark Metrics */}
              <div className="mt-5 border-t border-theme pt-4">
                <h4 className="font-mono text-xs font-semibold text-theme-fg uppercase tracking-wider">
                  {"// PERFORMANCE METRICS"}
                </h4>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3 border border-theme bg-theme-sec p-3 font-mono">
                  {activeProject.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-[9px] sm:text-[10px] text-theme-dim">{m.label}</div>
                      <div className="mt-1 text-xs sm:text-sm font-semibold text-theme-accent">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-5 border-t border-theme pt-4">
                <h4 className="font-mono text-xs font-semibold text-theme-fg uppercase tracking-wider">
                  {"// TECHNOLOGY ARSENAL"}
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-theme bg-theme-sec px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[11px] sm:text-xs text-theme-fg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 border-t border-theme pt-5 sm:pt-6">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    className="flex items-center gap-2 border border-theme bg-theme-fg px-4 py-2 sm:py-2.5 font-mono text-xs text-theme-card hover:bg-theme-accent transition-all"
                    style={{ borderRadius: "0px" }}
                  >
                    <span>View Repository / Live</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    className="flex items-center gap-2 border border-theme bg-theme-card px-4 py-2 sm:py-2.5 font-mono text-xs text-theme-fg hover:border-theme-fg transition-colors"
                    style={{ borderRadius: "0px" }}
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
