"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Shield,
  Activity,
  FolderGit2,
  Users,
  Eye,
  Plus,
  Trash2,
  Edit,
  Check,
  ExternalLink,
  Lock,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Project, PROJECTS as INITIAL_PROJECTS } from "@/data/works";
import { AnalyticsSummary } from "@/lib/db";
import { useSoundFX } from "@/hooks/useSoundFX";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"analytics" | "projects">("analytics");

  // Analytics data (100% REAL)
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  // Projects data
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [crudMessage, setCrudMessage] = useState("");

  const { playClick, playSuccess } = useSoundFX();

  const loadAnalytics = useCallback(() => {
    setIsLoadingAnalytics(true);
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAnalytics(data.data);
        }
      })
      .finally(() => setIsLoadingAnalytics(false));
  }, []);

  const loadProjects = useCallback(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
        }
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        playSuccess();
        loadAnalytics();
        loadProjects();
      } else {
        setAuthError("Access Denied: Incorrect PIN.");
      }
    } catch {
      setAuthError("Failed to connect to authentication server.");
    }
  };

  const handleClearAnalytics = async () => {
    if (!confirm("Are you sure you want to clear all telemetry records?")) return;
    try {
      const res = await fetch("/api/analytics", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        playSuccess();
        setCrudMessage("Analytics telemetry flushed.");
        loadAnalytics();
        setTimeout(() => setCrudMessage(""), 3000);
      }
    } catch {
      setCrudMessage("Failed to reset analytics.");
    }
  };

  const handleSaveProject = async (project: Project) => {
    try {
      const isExisting = projects.some((p) => p.id === project.id);
      const url = isExisting ? `/api/projects/${project.id}` : "/api/projects";
      const method = isExisting ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      const data = await res.json();
      if (data.success) {
        playSuccess();
        setCrudMessage("Project successfully saved!");
        setEditingProject(null);
        setIsCreatingNew(false);
        loadProjects();
        setTimeout(() => setCrudMessage(""), 3000);
      }
    } catch {
      setCrudMessage("Failed to save project.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        playSuccess();
        setCrudMessage("Project removed from repository.");
        loadProjects();
        setTimeout(() => setCrudMessage(""), 3000);
      }
    } catch {
      setCrudMessage("Error deleting project.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] p-4 font-mono text-white">
        <div className="w-full max-w-sm border border-neutral-800 bg-[#121212] p-6 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 text-xs text-neutral-400">
            <Lock className="h-4 w-4 text-[#0066ff]" />
            <span>ADMIN AUTHENTICATION GATE</span>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] text-neutral-400 uppercase tracking-wider mb-1.5">
                Enter Master Passcode / PIN
              </label>
              <input
                type="password"
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Default: razzan2026"
                className="w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-[#0066ff]"
              />
            </div>

            {authError && <div className="text-xs text-rose-500 font-mono">{authError}</div>}

            <button
              type="submit"
              className="w-full border border-[#0066ff] bg-[#0066ff] py-2.5 text-xs uppercase tracking-wider text-white font-bold transition-all hover:bg-[#0055ff] cursor-pointer"
            >
              Unlock Control Station ↵
            </button>

            <div className="pt-2 text-center text-[10px] text-neutral-600">
              <Link href="/" className="hover:text-neutral-400">
                ← Return to Public Portfolio
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f4f5] font-mono">
      {/* Top Admin HUD Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-[#0d0d0d]/95 backdrop-blur-md px-4 py-3.5 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4 text-[#0066ff]" />
            <span className="font-bold text-sm text-white">RAZZAN CORE // ADMIN PANEL</span>
            <span className="hidden sm:inline border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[10px] text-emerald-400">
              REAL TELEMETRY ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 text-neutral-400 hover:text-white"
            >
              <span>View Site</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-neutral-500 hover:text-rose-400 cursor-pointer"
            >
              Lock / Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setActiveTab("analytics");
                loadAnalytics();
              }}
              className={`flex items-center gap-2 border px-4 py-2 text-xs transition-colors cursor-pointer ${
                activeTab === "analytics"
                  ? "border-[#0066ff] bg-[#0066ff] text-white font-bold"
                  : "border-neutral-800 bg-[#121212] text-neutral-400 hover:border-neutral-700"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Real-Time Visitor Monitor</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setActiveTab("projects");
                loadProjects();
              }}
              className={`flex items-center gap-2 border px-4 py-2 text-xs transition-colors cursor-pointer ${
                activeTab === "projects"
                  ? "border-[#0066ff] bg-[#0066ff] text-white font-bold"
                  : "border-neutral-800 bg-[#121212] text-neutral-400 hover:border-neutral-700"
              }`}
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Project CMS ({projects.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {crudMessage && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <Check className="h-4 w-4" />
                <span>{crudMessage}</span>
              </div>
            )}

            {activeTab === "analytics" && (
              <button
                onClick={handleClearAnalytics}
                className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                title="Reset all recorded traffic telemetry"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear Telemetry</span>
              </button>
            )}
          </div>
        </div>

        {/* --- TAB 1: VISITOR ANALYTICS (REAL CLOUDFLARE/PLAUSIBLE TELEMETRY) --- */}
        {activeTab === "analytics" && (
          <div className="mt-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>TOTAL REAL PAGEVIEWS</span>
                  <Eye className="h-4 w-4 text-[#0066ff]" />
                </div>
                <div className="mt-3 text-3xl font-bold text-white">
                  {analytics?.totalViews.toLocaleString() ?? "0"}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500">Live request hits</div>
              </div>

              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>UNIQUE VISITORS</span>
                  <Users className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-3 text-3xl font-bold text-white">
                  {analytics?.uniqueVisitors.toLocaleString() ?? "0"}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500">Unique fingerprint sessions</div>
              </div>

              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>LAST 24 HOURS</span>
                  <Activity className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-3 text-3xl font-bold text-white">
                  {analytics?.todayViews.toLocaleString() ?? "0"}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500">Recent active visits</div>
              </div>

              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>TELEMETRY STATE</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="mt-3 text-3xl font-bold text-emerald-400">ONLINE</div>
                <div className="mt-1 text-[11px] text-neutral-500">Real-time DB recording</div>
              </div>
            </div>

            {/* 7-Day Traffic Graph */}
            <div className="border border-neutral-800 bg-[#121212] p-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="text-xs font-semibold text-white">
                  {"// 7-DAY REAL TRAFFIC TREND (PAGEVIEWS & VISITORS)"}
                </div>
                <button
                  onClick={loadAnalytics}
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white cursor-pointer"
                >
                  <RefreshCw className={`h-3 w-3 ${isLoadingAnalytics ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {analytics?.totalViews === 0 ? (
                <div className="my-12 text-center text-xs text-neutral-500 font-mono">
                  No visits recorded yet. Browse the public portfolio or /project pages to generate live telemetry!
                </div>
              ) : (
                <div className="mt-6 flex h-48 items-end gap-3 sm:gap-6 border-b border-neutral-800 pb-2">
                  {analytics?.dailyViews.map((day) => {
                    const maxView = Math.max(...(analytics.dailyViews.map((d) => d.views) || [1]), 5);
                    const heightPercent = day.views > 0 ? Math.max(14, (day.views / maxView) * 100) : 4;

                    return (
                      <div key={day.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                          {day.views}
                        </div>
                        <div
                          className={`w-full transition-all ${
                            day.views > 0 ? "bg-[#0066ff] hover:bg-[#0088ff]" : "bg-neutral-800/40"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <div className="text-[10px] text-neutral-500">{day.date}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Breakdown Grids */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Top Viewed Projects */}
              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="text-xs font-semibold text-white border-b border-neutral-800 pb-3">
                  TOP VIEWED PROJECTS
                </div>
                <div className="mt-4 space-y-3">
                  {analytics?.topProjects.length === 0 ? (
                    <div className="text-xs text-neutral-500 py-3">No project clicks logged yet.</div>
                  ) : (
                    analytics?.topProjects.map((item, idx) => (
                      <div key={item.slug} className="flex items-center justify-between text-xs">
                        <div className="truncate pr-2">
                          <span className="text-neutral-500 mr-1.5">0{idx + 1}</span>
                          <span className="text-neutral-200">{item.title}</span>
                        </div>
                        <span className="font-bold text-[#0066ff]">{item.views} views</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Referrers */}
              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="text-xs font-semibold text-white border-b border-neutral-800 pb-3 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#0066ff]" />
                  <span>TRAFFIC SOURCES</span>
                </div>
                <div className="mt-4 space-y-3">
                  {analytics?.referrers.length === 0 ? (
                    <div className="text-xs text-neutral-500 py-3">No referrer data logged yet.</div>
                  ) : (
                    analytics?.referrers.map((ref) => (
                      <div key={ref.source} className="flex items-center justify-between text-xs">
                        <span className="text-neutral-300 truncate">{ref.source}</span>
                        <span className="text-neutral-400 font-bold">{ref.count}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Device Breakdown */}
              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="text-xs font-semibold text-white border-b border-neutral-800 pb-3 flex items-center gap-1.5">
                  <Monitor className="h-3.5 w-3.5 text-emerald-400" />
                  <span>DEVICE BREAKDOWN</span>
                </div>
                <div className="mt-4 space-y-3">
                  {analytics?.devices.length === 0 ? (
                    <div className="text-xs text-neutral-500 py-3">No device data logged yet.</div>
                  ) : (
                    analytics?.devices.map((d) => (
                      <div key={d.device} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {d.device === "mobile" ? (
                            <Smartphone className="h-3.5 w-3.5 text-neutral-400" />
                          ) : (
                            <Monitor className="h-3.5 w-3.5 text-neutral-400" />
                          )}
                          <span className="capitalize text-neutral-300">{d.device}</span>
                        </div>
                        <span className="font-bold text-neutral-400">{d.count} hits</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Real-time Live Event Log Table */}
            <div className="border border-neutral-800 bg-[#121212] p-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>REAL-TIME LIVE TELEMETRY LOGS (LATEST {analytics?.recentEvents.length || 0} REQUESTS)</span>
                </div>
                <span className="text-[10px] text-neutral-500">Auto-streamed</span>
              </div>

              {analytics?.recentEvents.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500">
                  No requests recorded in database.
                </div>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-500 text-[10px]">
                        <th className="py-2 pr-4">TIME</th>
                        <th className="py-2 pr-4">PATH</th>
                        <th className="py-2 pr-4">SOURCE / REFERRER</th>
                        <th className="py-2 pr-4">DEVICE / BROWSER</th>
                        <th className="py-2 text-right">SESSION HASH</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                      {analytics?.recentEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-neutral-900/50">
                          <td className="py-2.5 pr-4 text-neutral-500 text-[11px] whitespace-nowrap">
                            {new Date(evt.timestamp).toLocaleTimeString()}
                          </td>
                          <td className="py-2.5 pr-4 font-semibold text-white">
                            {evt.path}
                          </td>
                          <td className="py-2.5 pr-4 text-neutral-400 truncate max-w-[160px]">
                            {evt.referrer}
                          </td>
                          <td className="py-2.5 pr-4 text-neutral-400 capitalize">
                            {evt.device} • {evt.browser}
                          </td>
                          <td className="py-2.5 text-right text-neutral-500 font-mono text-[10px]">
                            {evt.ipHash}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 2: PROJECT CMS (CRUD) --- */}
        {activeTab === "projects" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Project Catalog Repository</h2>
                <p className="text-xs text-neutral-500">Manage all showcase systems, case studies, and tags.</p>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setEditingProject({
                    id: "sys-" + Math.random().toString(36).substring(2, 6),
                    slug: "new-system",
                    title: "New Distributed System",
                    subtitle: "High-performance architecture engine",
                    category: "Systems & Infrastructure",
                    role: "Lead Engineer",
                    year: "2026",
                    description: "Comprehensive system architecture breakdown...",
                    highlights: [
                      "Designed zero-allocation data pipeline",
                      "Benchmarked sub-millisecond p99 latency",
                    ],
                    metrics: [
                      { label: "Throughput", value: "100k req/s" },
                      { label: "Latency", value: "< 1.5ms" },
                      { label: "Uptime", value: "99.99%" },
                    ],
                    tags: ["Go", "TypeScript", "Next.js", "PostgreSQL"],
                    liveUrl: "https://github.com/YuZann81",
                    githubUrl: "https://github.com/YuZann81",
                    featured: true,
                    image: "/next.svg",
                  });
                  setIsCreatingNew(true);
                }}
                className="flex items-center gap-1.5 border border-[#0066ff] bg-[#0066ff] px-3.5 py-2 text-xs text-white font-bold hover:bg-[#0055ff] cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Project List */}
            <div className="divide-y divide-neutral-800 border border-neutral-800 bg-[#121212]">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-neutral-900/60"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-neutral-500">0{idx + 1}</span>
                      <span className="font-bold text-white text-sm">{project.title}</span>
                      <span className="border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[10px] text-neutral-400">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-1">{project.subtitle}</p>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 pt-1">
                      <span>Slug: /project/{project.slug}</span>
                      <span>•</span>
                      <span>Year: {project.year}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/project/${project.slug}`}
                      target="_blank"
                      className="border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
                    >
                      Preview
                    </Link>

                    <button
                      onClick={() => {
                        playClick();
                        setEditingProject(project);
                        setIsCreatingNew(false);
                      }}
                      className="flex items-center gap-1 border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs text-neutral-300 hover:text-white cursor-pointer"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="border border-neutral-800 bg-neutral-900 p-1.5 text-rose-400 hover:bg-rose-950/40 cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit / Create Modal Form */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
                <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#0066ff] bg-[#121212] p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="text-sm font-bold text-white">
                      {isCreatingNew ? "Create New Production System" : `Edit Project // ${editingProject.slug}`}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-neutral-500 hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveProject(editingProject);
                    }}
                    className="mt-5 space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-400 mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">URL Slug (e.g. sentinel-core)</label>
                        <input
                          type="text"
                          required
                          value={editingProject.slug}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                          className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-neutral-400 mb-1">Category</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as Project["category"] })}
                          className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                        >
                          <option value="Systems & Infrastructure">Systems & Infrastructure</option>
                          <option value="Full Stack">Full Stack</option>
                          <option value="AI & Cloud">AI & Cloud</option>
                          <option value="Open Source">Open Source</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">Engineering Role</label>
                        <input
                          type="text"
                          value={editingProject.role}
                          onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                          className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">Year</label>
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">Subtitle / Short Summary</label>
                      <input
                        type="text"
                        value={editingProject.subtitle}
                        onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                        className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">Architecture & Problem Statement</label>
                      <textarea
                        rows={4}
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">Tech Stack Tags (Comma Separated)</label>
                      <input
                        type="text"
                        value={editingProject.tags.join(", ")}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                          })
                        }
                        placeholder="Go, Rust, TypeScript, Next.js"
                        className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-400 mb-1">Live URL Demo</label>
                        <input
                          type="text"
                          value={editingProject.liveUrl || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">GitHub Repo URL</label>
                        <input
                          type="text"
                          value={editingProject.githubUrl || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className="w-full border border-neutral-700 bg-neutral-900 p-2 text-white outline-none focus:border-[#0066ff]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="border border-neutral-700 px-4 py-2 text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="border border-[#0066ff] bg-[#0066ff] px-5 py-2 text-white font-bold hover:bg-[#0055ff] cursor-pointer"
                      >
                        Save Project Spec ↵
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
