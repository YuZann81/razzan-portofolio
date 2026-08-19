"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Shield,
  Eye,
  EyeOff,
  Activity,
  FolderGit2,
  Cpu,
  Mail,
  Lock,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  RefreshCw,
  Search,
  X,
  KeyRound,
  Inbox,
  Send,
  Clock,
} from "lucide-react";
import { Project } from "@/data/works";
import { TechStackItem, ContactMessage, AnalyticsSummary } from "@/lib/db";
import {
  TypeScriptIcon,
  GoIcon,
  RustIcon,
  PythonIcon,
  ReactIcon,
  NextjsIcon,
  PostgreSqlIcon,
  RedisIcon,
  DockerIcon,
  KafkaIcon,
  TailwindIcon,
} from "@/components/Icons";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TypeScriptIcon,
  GoIcon,
  RustIcon,
  PythonIcon,
  ReactIcon,
  NextjsIcon,
  PostgreSqlIcon,
  RedisIcon,
  DockerIcon,
  KafkaIcon,
  TailwindIcon,
  Cpu,
};

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredToken() {
  return typeof window !== "undefined" ? sessionStorage.getItem("razzan_admin_token") || "" : "";
}

function getServerToken() {
  return "";
}

export default function AdminPage() {
  const storedToken = useSyncExternalStore(subscribeStorage, getStoredToken, getServerToken);
  const [tokenOverride, setTokenOverride] = useState<string>("");
  const token = tokenOverride || storedToken;
  const isAuthenticated = Boolean(token);

  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"analytics" | "projects" | "techstack" | "messages" | "security">("analytics");

  // Telemetry state
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Tech Stack state
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [editingTech, setEditingTech] = useState<TechStackItem | null>(null);
  const [isCreatingTech, setIsCreatingTech] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageSearch, setMessageSearch] = useState("");

  // Security state
  const [currentPinInput, setCurrentPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [securityStatus, setSecurityStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Project Form State
  const [projForm, setProjForm] = useState<Partial<Project>>({
    id: "",
    slug: "",
    title: "",
    subtitle: "",
    category: "Systems & Infrastructure",
    year: new Date().getFullYear().toString(),
    role: "Lead Systems Architect",
    client: "Internal Infra",
    description: "",
    highlights: [],
    metrics: [{ label: "Throughput", value: "1.2M msg/s" }],
    tags: ["Go", "Kafka", "Docker"],
    githubUrl: "",
    liveUrl: "",
    featured: true,
    image: "/works/sentinel.png",
  });

  // Tech Form State
  const [techForm, setTechForm] = useState<Partial<TechStackItem>>({
    id: "",
    name: "",
    category: "languages",
    iconName: "TypeScriptIcon",
    level: "Expert",
    proficiency: 90,
    specialization: "",
    desc: "",
    sortOrder: 1,
  });

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
      if (res.ok && data.success) {
        setTokenOverride(data.token);
        sessionStorage.setItem("razzan_admin_token", data.token);
        window.dispatchEvent(new Event("storage"));
      } else {
        setAuthError(data.error || "Invalid Access Credentials");
      }
    } catch {
      setAuthError("Failed to reach authentication gate.");
    }
  };

  const handleLogout = () => {
    setTokenOverride("");
    sessionStorage.removeItem("razzan_admin_token");
    window.dispatchEvent(new Event("storage"));
    setPin("");
  };

  // Fetch Telemetry
  const fetchAnalytics = useCallback(async () => {
    if (!token) return;
    setLoadingAnalytics(true);
    try {
      const res = await fetch("/api/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && data.success) {
        setAnalytics(data.analytics || data.data || null);
      }
    } catch {
      // Ignore
    } finally {
      setLoadingAnalytics(false);
    }
  }, [token]);

  // Fetch Projects
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data && data.success) {
        const list = Array.isArray(data.projects) ? data.projects : Array.isArray(data.data) ? data.data : [];
        setProjects(list);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Fetch Tech Stack
  const fetchTechStack = useCallback(async () => {
    try {
      const res = await fetch("/api/techstack");
      const data = await res.json();
      if (data && data.success) {
        const list = Array.isArray(data.items) ? data.items : Array.isArray(data.data) ? data.data : [];
        setTechStack(list);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Fetch Messages
  const fetchMessages = useCallback(async () => {
    if (!token) return;
    setLoadingMessages(true);
    try {
      const res = await fetch("/api/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && data.success) {
        const list = Array.isArray(data.messages) ? data.messages : Array.isArray(data.data) ? data.data : [];
        setMessages(list);
      }
    } catch {
      // Ignore
    } finally {
      setLoadingMessages(false);
    }
  }, [token]);

  // Load active tab data
  useEffect(() => {
    if (!isAuthenticated) return;
    let isRunning = true;

    const loadData = async () => {
      if (!isRunning) return;
      if (activeTab === "analytics") await fetchAnalytics();
      if (activeTab === "projects") await fetchProjects();
      if (activeTab === "techstack") await fetchTechStack();
      if (activeTab === "messages") await fetchMessages();
    };

    loadData();

    return () => {
      isRunning = false;
    };
  }, [isAuthenticated, activeTab, fetchAnalytics, fetchProjects, fetchTechStack, fetchMessages]);

  // Save Project Handler
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.title || !projForm.slug) return;

    try {
      const payload: Project = {
        id: projForm.id || projForm.slug!,
        slug: projForm.slug!,
        title: projForm.title!,
        subtitle: projForm.subtitle || "",
        category: (projForm.category as "Full Stack" | "Systems & Infrastructure" | "AI & Cloud" | "Open Source") || "Systems & Infrastructure",
        year: projForm.year || new Date().getFullYear().toString(),
        role: projForm.role || "Lead Systems Architect",
        client: projForm.client || "Open Engineering",
        description: projForm.description || "",
        highlights: Array.isArray(projForm.highlights) ? projForm.highlights : [],
        metrics: Array.isArray(projForm.metrics) ? projForm.metrics : [{ label: "Reliability", value: "100%" }],
        tags: Array.isArray(projForm.tags) ? projForm.tags : String(projForm.tags).split(",").map((s) => s.trim()).filter(Boolean),
        githubUrl: projForm.githubUrl || "",
        liveUrl: projForm.liveUrl || "",
        featured: Boolean(projForm.featured),
        image: projForm.image || "/works/sentinel.png",
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsCreatingProject(false);
        setEditingProject(null);
        fetchProjects();
      }
    } catch {
      // Ignore
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm(`Are you sure you want to delete project: ${id}?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchProjects();
      }
    } catch {
      // Ignore
    }
  };

  // Save Tech Stack Handler
  const handleSaveTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techForm.name) return;

    try {
      const payload = {
        ...techForm,
        id: techForm.id || techForm.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      };

      const res = await fetch("/api/techstack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsCreatingTech(false);
        setEditingTech(null);
        fetchTechStack();
      }
    } catch {
      // Ignore
    }
  };

  const handleDeleteTech = async (id: string) => {
    if (!confirm(`Are you sure you want to delete tech: ${id}?`)) return;

    try {
      const res = await fetch(`/api/techstack/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchTechStack();
      }
    } catch {
      // Ignore
    }
  };

  // Message Operations
  const handleToggleMessageRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ read: !currentRead }),
      });

      if (res.ok) {
        fetchMessages();
      }
    } catch {
      // Ignore
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transmission log?")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchMessages();
      }
    } catch {
      // Ignore
    }
  };

  // Change Master PIN Handler
  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityStatus(null);

    if (newPinInput !== confirmPinInput) {
      setSecurityStatus({ type: "error", text: "New PIN and Confirmation PIN do not match." });
      return;
    }

    try {
      const res = await fetch("/api/settings/pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPin: currentPinInput, newPin: newPinInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTokenOverride(data.newToken);
        sessionStorage.setItem("razzan_admin_token", data.newToken);
        window.dispatchEvent(new Event("storage"));
        setSecurityStatus({ type: "success", text: "Master PIN updated successfully! Store your new PIN securely." });
        setCurrentPinInput("");
        setNewPinInput("");
        setConfirmPinInput("");
      } else {
        setSecurityStatus({ type: "error", text: data.error || "Failed to update Master PIN." });
      }
    } catch {
      setSecurityStatus({ type: "error", text: "Network error while updating PIN." });
    }
  };

  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeTechStack = Array.isArray(techStack) ? techStack : [];
  const safeMessages = Array.isArray(messages) ? messages : [];
  const unreadCount = safeMessages.filter((m) => !m.read).length;

  // Render Login Gate when not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#080808] text-[#f4f4f5] flex items-center justify-center p-4">
        <div className="w-full max-w-md border border-neutral-800 bg-[#121212] p-6 sm:p-8" style={{ borderRadius: "0px" }}>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2 text-white">
              <Shield className="h-4 w-4 text-[#0066ff]" />
              <span className="font-bold">SYS_ADMIN.STATION</span>
            </div>
            <span>PORT_3000</span>
          </div>

          <div className="my-6 space-y-1 text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">Security Clearance</h1>
            <p className="font-mono text-xs text-neutral-400">
              Provide Master Access Key to control telemetry, projects, tech arsenal &amp; messages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
                MASTER ACCESS PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Master Security Key"
                  required
                  autoFocus
                  className="w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-neutral-600 outline-none focus:border-[#0066ff]"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="border border-red-900/60 bg-red-950/40 p-2.5 font-mono text-xs text-red-400">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 border border-neutral-700 bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] cursor-pointer"
              style={{ borderRadius: "0px" }}
            >
              <Lock className="h-3.5 w-3.5" />
              <span>AUTHENTICATE &amp; UNLOCK</span>
            </button>
          </form>

          <div className="mt-6 border-t border-neutral-800/80 pt-4 flex justify-between font-mono text-[10px] text-neutral-600">
            <span>RAZZAN.SITE // CMS ENGINE</span>
            <Link href="/" className="text-neutral-400 hover:text-white">
              ← Return to Site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- AUTHENTICATED COMMAND CENTER ---
  return (
    <main className="min-h-screen w-full bg-[#080808] text-[#f4f4f5]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-[#080808]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-mono text-xs font-bold text-white">
              <Shield className="h-4 w-4 text-[#0066ff]" />
              <span>RAZZAN_CONTROL_CENTER</span>
            </Link>
            <span className="hidden sm:inline border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
              SYS_AUTHENTICATED
            </span>
          </div>

          {/* Tab Navigation */}
          <nav className="flex items-center gap-1 font-mono text-xs overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === "analytics" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
              style={{ borderRadius: "0px" }}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === "projects" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
              style={{ borderRadius: "0px" }}
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveTab("techstack")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === "techstack" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
              style={{ borderRadius: "0px" }}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Tech Arsenal</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === "messages" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
              style={{ borderRadius: "0px" }}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Inbox</span>
              {unreadCount > 0 && (
                <span className="ml-1 rounded-full bg-[#0066ff] px-1.5 py-0.2 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === "security" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
              style={{ borderRadius: "0px" }}
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Security</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="border border-neutral-800 bg-neutral-900 px-3 py-1.5 font-mono text-[11px] text-neutral-400 hover:text-red-400 hover:border-red-900 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Command Workspace */}
      <div className="mx-auto max-w-[1360px] p-4 sm:p-6 lg:px-8 py-6">
        {/* ======================================================== */}
        {/* TAB 1: TELEMETRY & ANALYTICS                             */}
        {/* ======================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Real-Time Traffic &amp; Telemetry</h2>
                <p className="font-mono text-xs text-neutral-400">
                  Direct stream of incoming requests, device breakdowns, and pageview telemetry.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchAnalytics}
                  disabled={loadingAnalytics}
                  className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-300 hover:border-white transition-colors cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loadingAnalytics ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono">
              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="text-[11px] text-neutral-500 uppercase">TOTAL REQUESTS</div>
                <div className="mt-2 text-3xl font-bold text-white">{analytics?.totalViews || 0}</div>
                <div className="mt-1 text-[10px] text-neutral-400">100% Real Live Logs</div>
              </div>

              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="text-[11px] text-neutral-500 uppercase">UNIQUE VISITORS</div>
                <div className="mt-2 text-3xl font-bold text-[#0066ff]">{analytics?.uniqueVisitors || 0}</div>
                <div className="mt-1 text-[10px] text-neutral-400">Distinct IP / Browser Hashes</div>
              </div>

              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="text-[11px] text-neutral-500 uppercase">TODAY&apos;S TRAFFIC (24H)</div>
                <div className="mt-2 text-3xl font-bold text-emerald-400">{analytics?.todayViews || 0}</div>
                <div className="mt-1 text-[10px] text-neutral-400">Live Window</div>
              </div>

              <div className="border border-neutral-800 bg-[#121212] p-5">
                <div className="text-[11px] text-neutral-500 uppercase">SYSTEM UPTIME</div>
                <div className="mt-2 text-3xl font-bold text-white">99.98%</div>
                <div className="mt-1 text-[10px] text-neutral-400">Turbopack Node Runtime</div>
              </div>
            </div>

            {/* Recent Live Events Table */}
            <div className="border border-neutral-800 bg-[#121212]">
              <div className="border-b border-neutral-800 p-4 font-mono text-xs font-bold text-white flex justify-between items-center">
                <span>RECENT TELEMETRY REQUEST STREAM</span>
                <span className="text-neutral-500 text-[10px] font-normal">Auto-logged on navigation</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-neutral-800 bg-neutral-900/50 text-[10px] uppercase text-neutral-400">
                    <tr>
                      <th className="p-3">Time</th>
                      <th className="p-3">Path</th>
                      <th className="p-3">Referrer</th>
                      <th className="p-3">Device</th>
                      <th className="p-3">Browser</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {analytics?.recentEvents && analytics.recentEvents.length > 0 ? (
                      analytics.recentEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-neutral-900/30">
                          <td className="p-3 text-neutral-500 whitespace-nowrap">
                            {new Date(evt.timestamp).toLocaleTimeString()}
                          </td>
                          <td className="p-3 font-semibold text-white whitespace-nowrap">{evt.path}</td>
                          <td className="p-3 text-neutral-400 whitespace-nowrap">{evt.referrer || "Direct"}</td>
                          <td className="p-3 capitalize">{evt.device}</td>
                          <td className="p-3 text-neutral-400">{evt.browser}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-neutral-500">
                          No pageview telemetry events recorded yet. Navigate through the site to generate live traffic!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PROJECTS MANAGEMENT (CMS)                         */}
        {/* ======================================================== */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Project Management &amp; Case Studies</h2>
                <p className="font-mono text-xs text-neutral-400">
                  Create, edit, and curate fullstack engineering case studies and benchmarks.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setProjForm({
                      id: "",
                      slug: "",
                      title: "",
                      subtitle: "",
                      category: "Systems & Infrastructure",
                      year: new Date().getFullYear().toString(),
                      role: "Lead Systems Architect",
                      client: "Internal Infra",
                      description: "",
                      highlights: [],
                      metrics: [{ label: "Throughput", value: "1.2M msg/s" }],
                      tags: ["Go", "Kafka", "Docker"],
                      githubUrl: "",
                      liveUrl: "",
                      featured: true,
                      image: "/works/sentinel.png",
                    });
                    setIsCreatingProject(true);
                    setEditingProject(null);
                  }}
                  className="flex items-center gap-1.5 border border-white bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] transition-all cursor-pointer"
                  style={{ borderRadius: "0px" }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Project</span>
                </button>
              </div>
            </div>

            {/* Project List */}
            {!isCreatingProject && !editingProject && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search projects by title, slug, or tech stack..."
                    className="w-full border border-neutral-800 bg-[#121212] pl-10 pr-4 py-2.5 font-mono text-xs text-white placeholder:text-neutral-600 outline-none focus:border-[#0066ff]"
                  />
                </div>

                <div className="border border-neutral-800 bg-[#121212]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="border-b border-neutral-800 bg-neutral-900/50 text-[10px] uppercase text-neutral-400">
                      <tr>
                        <th className="p-3">Title &amp; Slug</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Tags</th>
                        <th className="p-3">Featured</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                      {safeProjects
                        .filter((p) =>
                          (p.title || "").toLowerCase().includes(projectSearch.toLowerCase()) ||
                          (p.slug || "").toLowerCase().includes(projectSearch.toLowerCase())
                        )
                        .map((p) => (
                          <tr key={p.id} className="hover:bg-neutral-900/30">
                            <td className="p-3">
                              <div className="font-bold text-white">{p.title}</div>
                              <div className="text-[10px] text-neutral-500">/project/{p.slug}</div>
                            </td>
                            <td className="p-3 text-neutral-400">{p.category}</td>
                            <td className="p-3 text-neutral-400">{p.role}</td>
                            <td className="p-3 text-neutral-400">
                              <div className="flex flex-wrap gap-1">
                                {(p.tags || []).slice(0, 3).map((t) => (
                                  <span key={t} className="border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-[9px]">
                                    {t}
                                  </span>
                                ))}
                                {(p.tags || []).length > 3 && <span className="text-[9px]">+{p.tags.length - 3}</span>}
                              </div>
                            </td>
                            <td className="p-3">
                              {p.featured ? (
                                <span className="border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                                  FEATURED
                                </span>
                              ) : (
                                <span className="text-[10px] text-neutral-600">Archive</span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/project/${p.slug}`}
                                  target="_blank"
                                  className="p-1 text-neutral-400 hover:text-white"
                                  title="View Case Study"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                                <button
                                  onClick={() => {
                                    setProjForm({ ...p });
                                    setEditingProject(p);
                                  }}
                                  className="p-1 text-neutral-400 hover:text-[#0066ff] cursor-pointer"
                                  title="Edit Project"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(p.id)}
                                  className="p-1 text-neutral-400 hover:text-red-400 cursor-pointer"
                                  title="Delete Project"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Project Create / Edit Form */}
            {(isCreatingProject || editingProject) && (
              <form onSubmit={handleSaveProject} className="border border-neutral-800 bg-[#121212] p-6 space-y-5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-bold text-white text-sm">
                    {editingProject ? `Edit Project: ${editingProject.title}` : "Create New Production Project"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingProject(false);
                      setEditingProject(null);
                    }}
                    className="text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projForm.title || ""}
                      onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                      placeholder="e.g. Sentinel Distributed Core"
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Slug URL Identifier *</label>
                    <input
                      type="text"
                      required
                      value={projForm.slug || ""}
                      onChange={(e) => setProjForm({ ...projForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
                      placeholder="e.g. sentinel-core"
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Category *</label>
                    <select
                      value={projForm.category || "Systems & Infrastructure"}
                      onChange={(e) => setProjForm({ ...projForm, category: e.target.value as "Full Stack" | "Systems & Infrastructure" | "AI & Cloud" | "Open Source" })}
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    >
                      <option value="Systems & Infrastructure">Systems &amp; Infrastructure</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="AI & Cloud">AI &amp; Cloud</option>
                      <option value="Open Source">Open Source</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Year</label>
                    <input
                      type="text"
                      value={projForm.year || ""}
                      onChange={(e) => setProjForm({ ...projForm, year: e.target.value })}
                      placeholder="2026"
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Role / Responsibility</label>
                    <input
                      type="text"
                      value={projForm.role || ""}
                      onChange={(e) => setProjForm({ ...projForm, role: e.target.value })}
                      placeholder="e.g. Lead Systems Architect"
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Subtitle / Punchline</label>
                  <input
                    type="text"
                    value={projForm.subtitle || ""}
                    onChange={(e) => setProjForm({ ...projForm, subtitle: e.target.value })}
                    placeholder="Brief 1-line architecture punchline..."
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Tags / Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(projForm.tags) ? projForm.tags.join(", ") : projForm.tags || ""}
                    onChange={(e) => setProjForm({ ...projForm, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                    placeholder="Go, Kafka, Docker, Redis"
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Deep-Dive Case Study Description</label>
                  <textarea
                    rows={4}
                    value={projForm.description || ""}
                    onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    placeholder="Detailed architecture breakdown, concurrency model, and execution semantics..."
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">GitHub Repo URL</label>
                    <input
                      type="text"
                      value={projForm.githubUrl || ""}
                      onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Live Deployment URL</label>
                    <input
                      type="text"
                      value={projForm.liveUrl || ""}
                      onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={Boolean(projForm.featured)}
                    onChange={(e) => setProjForm({ ...projForm, featured: e.target.checked })}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label htmlFor="featured-check" className="text-white cursor-pointer select-none">
                    Show as Featured on Landing Page
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingProject(false);
                      setEditingProject(null);
                    }}
                    className="border border-neutral-800 bg-neutral-900 px-4 py-2 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="border border-white bg-white px-5 py-2 font-bold text-black hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] transition-all cursor-pointer"
                  >
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: TECH ARSENAL CMS                                  */}
        {/* ======================================================== */}
        {activeTab === "techstack" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Technical Arsenal Manager</h2>
                <p className="font-mono text-xs text-neutral-400">
                  Add, update, or reorder technologies, skill levels, and architecture specialties.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setTechForm({
                      id: "",
                      name: "",
                      category: "languages",
                      iconName: "TypeScriptIcon",
                      level: "Expert",
                      proficiency: 90,
                      specialization: "",
                      desc: "",
                      sortOrder: safeTechStack.length + 1,
                    });
                    setIsCreatingTech(true);
                    setEditingTech(null);
                  }}
                  className="flex items-center gap-1.5 border border-white bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] transition-all cursor-pointer"
                  style={{ borderRadius: "0px" }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Tech Item</span>
                </button>
              </div>
            </div>

            {/* Tech List */}
            {!isCreatingTech && !editingTech && (
              <div className="border border-neutral-800 bg-[#121212]">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-neutral-800 bg-neutral-900/50 text-[10px] uppercase text-neutral-400">
                    <tr>
                      <th className="p-3">Order</th>
                      <th className="p-3">Technology</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Proficiency</th>
                      <th className="p-3">Specialization</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {safeTechStack.map((t) => {
                      const IconComp = ICON_MAP[t.iconName] || Cpu;
                      return (
                        <tr key={t.id} className="hover:bg-neutral-900/30">
                          <td className="p-3 text-neutral-500 font-bold">#{t.sortOrder}</td>
                          <td className="p-3 font-semibold text-white">
                            <div className="flex items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center border border-neutral-800 bg-neutral-900 text-white">
                                <IconComp className="h-3.5 w-3.5" />
                              </div>
                              <span>{t.name}</span>
                            </div>
                          </td>
                          <td className="p-3 capitalize text-neutral-400">{t.category}</td>
                          <td className="p-3">
                            <span className="font-bold text-[#0066ff]">{t.proficiency}%</span>{" "}
                            <span className="text-neutral-500">({t.level})</span>
                          </td>
                          <td className="p-3 text-neutral-400">{t.specialization}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setTechForm({ ...t });
                                  setEditingTech(t);
                                }}
                                className="p-1 text-neutral-400 hover:text-[#0066ff] cursor-pointer"
                                title="Edit Item"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTech(t.id)}
                                className="p-1 text-neutral-400 hover:text-red-400 cursor-pointer"
                                title="Delete Item"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tech Create / Edit Form */}
            {(isCreatingTech || editingTech) && (
              <form onSubmit={handleSaveTech} className="border border-neutral-800 bg-[#121212] p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-bold text-white text-sm">
                    {editingTech ? `Edit Tech: ${editingTech.name}` : "Add Technology to Arsenal"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingTech(false);
                      setEditingTech(null);
                    }}
                    className="text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Tech Name *</label>
                    <input
                      type="text"
                      required
                      value={techForm.name || ""}
                      onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                      placeholder="e.g. Rust"
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Category *</label>
                    <select
                      value={techForm.category || "languages"}
                      onChange={(e) => setTechForm({ ...techForm, category: e.target.value as "languages" | "systems" | "frontend" })}
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    >
                      <option value="languages">Languages</option>
                      <option value="systems">Backend &amp; Distributed Systems</option>
                      <option value="frontend">Frontend &amp; Performance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Icon Identifier</label>
                    <select
                      value={techForm.iconName || "TypeScriptIcon"}
                      onChange={(e) => setTechForm({ ...techForm, iconName: e.target.value })}
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    >
                      <option value="TypeScriptIcon">TypeScript</option>
                      <option value="GoIcon">Go (Golang)</option>
                      <option value="RustIcon">Rust</option>
                      <option value="PythonIcon">Python</option>
                      <option value="NextjsIcon">Next.js</option>
                      <option value="ReactIcon">React</option>
                      <option value="PostgreSqlIcon">PostgreSQL</option>
                      <option value="RedisIcon">Redis</option>
                      <option value="KafkaIcon">Kafka</option>
                      <option value="DockerIcon">Docker</option>
                      <option value="TailwindIcon">Tailwind CSS</option>
                      <option value="Cpu">General Compute / Web Canvas</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Proficiency % (1-100)</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={techForm.proficiency || 90}
                      onChange={(e) => setTechForm({ ...techForm, proficiency: Number(e.target.value) })}
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Level Label</label>
                    <input
                      type="text"
                      value={techForm.level || "Expert"}
                      onChange={(e) => setTechForm({ ...techForm, level: e.target.value })}
                      placeholder="Expert / Advanced / Intermediate"
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={techForm.sortOrder || 1}
                      onChange={(e) => setTechForm({ ...techForm, sortOrder: Number(e.target.value) })}
                      className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Architectural Specialization Badge</label>
                  <input
                    type="text"
                    value={techForm.specialization || ""}
                    onChange={(e) => setTechForm({ ...techForm, specialization: e.target.value })}
                    placeholder="e.g. Zero-Allocation Memory Pools & Goroutines"
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={techForm.desc || ""}
                    onChange={(e) => setTechForm({ ...techForm, desc: e.target.value })}
                    placeholder="Technical description of capabilities..."
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingTech(false);
                      setEditingTech(null);
                    }}
                    className="border border-neutral-800 bg-neutral-900 px-4 py-2 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="border border-white bg-white px-5 py-2 font-bold text-black hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] transition-all cursor-pointer"
                  >
                    {editingTech ? "Update Tech" : "Add Tech"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: TRANSMISSION INBOX / MESSAGES                     */}
        {/* ======================================================== */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Transmission Inbox</h2>
                  {unreadCount > 0 && (
                    <span className="border border-[#0066ff] bg-[#0066ff]/20 px-2 py-0.5 font-mono text-xs text-[#0066ff] font-bold">
                      {unreadCount} UNREAD
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-neutral-400">
                  Direct client inquiries transmitted from the Contact section.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchMessages}
                  disabled={loadingMessages}
                  className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-300 hover:border-white transition-colors cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loadingMessages ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
                placeholder="Search messages by sender name, email, or content..."
                className="w-full border border-neutral-800 bg-[#121212] pl-10 pr-4 py-2.5 font-mono text-xs text-white placeholder:text-neutral-600 outline-none focus:border-[#0066ff]"
              />
            </div>

            {/* Messages Stream */}
            <div className="space-y-3 font-mono text-xs">
              {safeMessages.length === 0 ? (
                <div className="border border-neutral-800 bg-[#121212] p-12 text-center text-neutral-500">
                  <Inbox className="mx-auto h-8 w-8 text-neutral-600 mb-2" />
                  <div>No transmissions logged yet.</div>
                  <div className="text-[11px] text-neutral-600 mt-1">
                    When someone sends a message via the Contact Form on your portfolio, it will arrive here in real time!
                  </div>
                </div>
              ) : (
                safeMessages
                  .filter((m) =>
                    (m.name || "").toLowerCase().includes(messageSearch.toLowerCase()) ||
                    (m.email || "").toLowerCase().includes(messageSearch.toLowerCase()) ||
                    (m.message || "").toLowerCase().includes(messageSearch.toLowerCase())
                  )
                  .map((m) => (
                    <div
                      key={m.id}
                      className={`border p-5 transition-all ${
                        m.read
                          ? "border-neutral-800 bg-[#121212] text-neutral-300"
                          : "border-[#0066ff]/60 bg-neutral-900/60 text-white shadow-sm"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full ${m.read ? "bg-neutral-600" : "bg-[#0066ff] animate-pulse"}`}
                          />
                          <span className="font-bold text-sm text-white">{m.name}</span>
                          <span className="text-neutral-400">({m.email})</span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(m.timestamp).toLocaleString()}</span>
                          </div>

                          <a
                            href={`mailto:${m.email}?subject=RE: Transmission via Razzan.site`}
                            className="flex items-center gap-1 border border-neutral-700 bg-neutral-800 px-2 py-1 text-white hover:bg-[#0066ff] hover:border-[#0066ff] transition-colors"
                          >
                            <Send className="h-3 w-3" />
                            <span>Reply</span>
                          </a>

                          <button
                            onClick={() => handleToggleMessageRead(m.id, m.read)}
                            className="border border-neutral-800 bg-neutral-900 px-2 py-1 hover:text-white cursor-pointer"
                          >
                            {m.read ? "Mark Unread" : "Mark Read"}
                          </button>

                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="mt-3.5 font-sans text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                        {m.message}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: SECURITY & MASTER PIN                             */}
        {/* ======================================================== */}
        {activeTab === "security" && (
          <div className="max-w-2xl space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Security &amp; Access Controls</h2>
              <p className="font-mono text-xs text-neutral-400">
                Update Master PIN credentials and review security invariants.
              </p>
            </div>

            {/* Change Master PIN Card */}
            <div className="border border-neutral-800 bg-[#121212] p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 font-mono text-xs font-bold text-white">
                <KeyRound className="h-4 w-4 text-[#0066ff]" />
                <span>ROTATE MASTER SECURITY PIN</span>
              </div>

              {securityStatus && (
                <div
                  className={`p-3 font-mono text-xs border ${
                    securityStatus.type === "success"
                      ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300"
                      : "border-red-500/50 bg-red-950/40 text-red-300"
                  }`}
                >
                  {securityStatus.text}
                </div>
              )}

              <form onSubmit={handleChangePin} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Current Master PIN *</label>
                  <input
                    type="password"
                    required
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value)}
                    placeholder="Enter current PIN"
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">New Master Security PIN *</label>
                  <input
                    type="password"
                    required
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Minimum 6 characters, complex combination"
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">Confirm New PIN *</label>
                  <input
                    type="password"
                    required
                    value={confirmPinInput}
                    onChange={(e) => setConfirmPinInput(e.target.value)}
                    placeholder="Re-enter new PIN"
                    className="w-full border border-neutral-800 bg-neutral-900 p-2.5 text-white outline-none focus:border-[#0066ff]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="border border-white bg-white px-5 py-2.5 font-bold uppercase text-black hover:bg-[#0066ff] hover:text-white hover:border-[#0066ff] transition-all cursor-pointer"
                    style={{ borderRadius: "0px" }}
                  >
                    Update Security PIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
