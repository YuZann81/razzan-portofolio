import fs from "fs";
import path from "path";
import { Project, PROJECTS as INITIAL_PROJECTS } from "../data/works";

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const TECHSTACK_FILE = path.join(DATA_DIR, "techstack.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

export const DEFAULT_MASTER_PIN = "Rz@2026!Gianni#SysAdmin_99x";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  read: boolean;
  ipHash?: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: "languages" | "systems" | "frontend";
  iconName: string;
  level: string;
  proficiency: number;
  specialization: string;
  desc: string;
  sortOrder: number;
}

export interface PageViewEvent {
  id: string;
  timestamp: number;
  path: string;
  slug?: string;
  referrer: string;
  userAgent: string;
  device: "desktop" | "mobile" | "tablet";
  browser: string;
  ipHash?: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  topProjects: { slug: string; title: string; views: number }[];
  referrers: { source: string; count: number }[];
  devices: { device: string; count: number }[];
  dailyViews: { date: string; views: number; visitors: number }[];
  recentEvents: PageViewEvent[];
}

export const INITIAL_TECH_STACK: TechStackItem[] = [
  {
    id: "ts",
    name: "TypeScript",
    category: "languages",
    iconName: "TypeScriptIcon",
    level: "Expert",
    proficiency: 98,
    specialization: "Type-Level Metaprogramming & AST Transforms",
    desc: "Strict type contracts, generic variance, branded types, and high-performance Next.js application runtimes.",
    sortOrder: 1,
  },
  {
    id: "go",
    name: "Go (Golang)",
    category: "languages",
    iconName: "GoIcon",
    level: "Advanced",
    proficiency: 94,
    specialization: "Zero-Allocation Memory Pools & Goroutines",
    desc: "High-concurrency microservices, gRPC stream multiplexing, and custom event broker pipelines.",
    sortOrder: 2,
  },
  {
    id: "rust",
    name: "Rust",
    category: "languages",
    iconName: "RustIcon",
    level: "Intermediate",
    proficiency: 82,
    specialization: "Memory Safety & WebAssembly Compute",
    desc: "Zero-cost abstractions, memory safety without GC overhead, and low-latency systems programming.",
    sortOrder: 3,
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    iconName: "PythonIcon",
    level: "Advanced",
    proficiency: 90,
    specialization: "Vector Search & Multi-Agent Orchestration",
    desc: "Async FastAPI backends, semantic embedding indexing, and deterministic LLM tool validation.",
    sortOrder: 4,
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "frontend",
    iconName: "NextjsIcon",
    level: "Expert",
    proficiency: 96,
    specialization: "App Router & Server Components SSR",
    desc: "Turbopack builds, dynamic edge routes, optimistic mutations, and zero-bundle server logic.",
    sortOrder: 5,
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    iconName: "ReactIcon",
    level: "Expert",
    proficiency: 96,
    specialization: "Concurrent Rendering & Action Hooks",
    desc: "Deterministic state management, useSyncExternalStore primitives, and Lighthouse 100 optimization.",
    sortOrder: 6,
  },
  {
    id: "postgres",
    name: "PostgreSQL 17",
    category: "systems",
    iconName: "PostgreSqlIcon",
    level: "Expert",
    proficiency: 92,
    specialization: "ACID Isolation & Complex Index Tuning",
    desc: "Query plan analysis (EXPLAIN ANALYZE), table partitioning, connection pooling, and read-replicas.",
    sortOrder: 7,
  },
  {
    id: "redis",
    name: "Redis 7.2",
    category: "systems",
    iconName: "RedisIcon",
    level: "Expert",
    proficiency: 94,
    specialization: "Distributed Locks & Atomic Token Buckets",
    desc: "High-throughput in-memory caching topologies, pub/sub channels, and sub-millisecond key-value lookups.",
    sortOrder: 8,
  },
  {
    id: "kafka",
    name: "Apache Kafka",
    category: "systems",
    iconName: "KafkaIcon",
    level: "Advanced",
    proficiency: 88,
    specialization: "Partition Strategies & Consumer Balancing",
    desc: "Event sourcing, distributed log serialization, backpressure handling, and real-time data streaming.",
    sortOrder: 9,
  },
  {
    id: "docker",
    name: "Docker & Linux",
    category: "systems",
    iconName: "DockerIcon",
    level: "Advanced",
    proficiency: 90,
    specialization: "MicroVM Sandboxing & Multi-Stage Builds",
    desc: "Minimal container images, Linux kernel primitives, systemd orchestration, and CI/CD pipelines.",
    sortOrder: 10,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "frontend",
    iconName: "TailwindIcon",
    level: "Expert",
    proficiency: 98,
    specialization: "Modern Design Tokens & Mathematical Grids",
    desc: "Zero-runtime CSS variable architecture, dark/light theme tokens, and responsive layout math.",
    sortOrder: 11,
  },
  {
    id: "canvas",
    name: "Web Canvas 2D / Audio",
    category: "frontend",
    iconName: "Cpu",
    level: "Advanced",
    proficiency: 88,
    specialization: "120 FPS Physics & Synthesized Audio",
    desc: "Interactive particle gravitation, inertial lerp math, and zero-latency Web Audio soundscapes.",
    sortOrder: 12,
  },
];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(INITIAL_PROJECTS, null, 2), "utf-8");
  }

  if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify([], null, 2), "utf-8");
  }

  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), "utf-8");
  }

  if (!fs.existsSync(TECHSTACK_FILE)) {
    fs.writeFileSync(TECHSTACK_FILE, JSON.stringify(INITIAL_TECH_STACK, null, 2), "utf-8");
  }

  if (!fs.existsSync(SETTINGS_FILE)) {
    const initialSettings = { adminPin: process.env.ADMIN_PIN || DEFAULT_MASTER_PIN };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(initialSettings, null, 2), "utf-8");
  }
}

// --- SETTINGS & PIN OPS ---
export function getAdminPin(): string {
  ensureDataDir();
  try {
    const data = fs.readFileSync(SETTINGS_FILE, "utf-8");
    const settings = JSON.parse(data);
    return settings.adminPin || process.env.ADMIN_PIN || DEFAULT_MASTER_PIN;
  } catch {
    return process.env.ADMIN_PIN || DEFAULT_MASTER_PIN;
  }
}

export function updateAdminPin(newPin: string): boolean {
  ensureDataDir();
  try {
    let settings: { adminPin?: string } = {};
    if (fs.existsSync(SETTINGS_FILE)) {
      settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8"));
    }
    settings.adminPin = newPin;
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

// --- PROJECT DATABASE OPS ---
export function getAllProjects(): Project[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug || p.id === slug);
}

export function saveProject(project: Project): Project {
  ensureDataDir();
  const projects = getAllProjects();
  const existingIndex = projects.findIndex((p) => p.id === project.id || p.slug === project.slug);

  if (existingIndex >= 0) {
    projects[existingIndex] = { ...projects[existingIndex], ...project };
  } else {
    projects.push(project);
  }

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
  return project;
}

export function deleteProject(id: string): boolean {
  ensureDataDir();
  const projects = getAllProjects();
  const filtered = projects.filter((p) => p.id !== id && p.slug !== id);

  if (filtered.length !== projects.length) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}

// --- TECH STACK CMS OPS ---
export function getAllTechStack(): TechStackItem[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(TECHSTACK_FILE, "utf-8");
    const items: TechStackItem[] = JSON.parse(data);
    return items.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return INITIAL_TECH_STACK;
  }
}

export function saveTechStackItem(item: TechStackItem): TechStackItem {
  ensureDataDir();
  const stack = getAllTechStack();
  const existingIndex = stack.findIndex((s) => s.id === item.id);

  if (existingIndex >= 0) {
    stack[existingIndex] = { ...stack[existingIndex], ...item };
  } else {
    stack.push(item);
  }

  fs.writeFileSync(TECHSTACK_FILE, JSON.stringify(stack, null, 2), "utf-8");
  return item;
}

export function deleteTechStackItem(id: string): boolean {
  ensureDataDir();
  const stack = getAllTechStack();
  const filtered = stack.filter((s) => s.id !== id);

  if (filtered.length !== stack.length) {
    fs.writeFileSync(TECHSTACK_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}

// --- TRANSMISSION / MESSAGES INBOX OPS ---
export function saveContactMessage(msg: Omit<ContactMessage, "id" | "timestamp" | "read">): ContactMessage {
  ensureDataDir();
  const newMessage: ContactMessage = {
    ...msg,
    id: "msg_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36),
    timestamp: Date.now(),
    read: false,
  };

  const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
  const messages: ContactMessage[] = JSON.parse(data);
  messages.unshift(newMessage); // Newest first

  if (messages.length > 1000) {
    messages.splice(1000);
  }

  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

  return newMessage;
}

export function getAllMessages(): ContactMessage[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function markMessageAsRead(id: string, read = true): boolean {
  ensureDataDir();
  try {
    const messages = getAllMessages();
    const target = messages.find((m) => m.id === id);
    if (target) {
      target.read = read;
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function deleteMessage(id: string): boolean {
  ensureDataDir();
  try {
    const messages = getAllMessages();
    const filtered = messages.filter((m) => m.id !== id);
    if (filtered.length !== messages.length) {
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// --- ANALYTICS ENGINE OPS (100% REAL DATA) ---
export function recordPageView(event: Omit<PageViewEvent, "id" | "timestamp">): PageViewEvent {
  ensureDataDir();
  const fullEvent: PageViewEvent = {
    ...event,
    id: "evt_" + Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
  };

  try {
    const data = fs.readFileSync(ANALYTICS_FILE, "utf-8");
    const events: PageViewEvent[] = JSON.parse(data);
    events.push(fullEvent);

    if (events.length > 10000) {
      events.splice(0, events.length - 10000);
    }

    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(events, null, 2), "utf-8");
  } catch {
    // Ignore error
  }

  return fullEvent;
}

export function clearAnalytics(): void {
  ensureDataDir();
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify([], null, 2), "utf-8");
}

export function getAnalyticsSummary(): AnalyticsSummary {
  ensureDataDir();
  try {
    const data = fs.readFileSync(ANALYTICS_FILE, "utf-8");
    const events: PageViewEvent[] = JSON.parse(data);
    const projects = getAllProjects();

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const totalViews = events.length;
    const uniqueIps = new Set(events.map((e) => e.ipHash || e.userAgent));
    const uniqueVisitors = uniqueIps.size;
    const todayViews = events.filter((e) => e.timestamp >= oneDayAgo).length;

    // Real project view counts
    const projectCountMap: Record<string, number> = {};
    events.forEach((e) => {
      if (e.slug) {
        projectCountMap[e.slug] = (projectCountMap[e.slug] || 0) + 1;
      }
    });

    const topProjects = Object.entries(projectCountMap)
      .map(([slug, views]) => {
        const proj = projects.find((p) => p.slug === slug || p.id === slug);
        return {
          slug,
          title: proj?.title || slug,
          views,
        };
      })
      .sort((a, b) => b.views - a.views);

    // Real Referrers
    const refMap: Record<string, number> = {};
    events.forEach((e) => {
      const ref = e.referrer || "Direct / Organic";
      refMap[ref] = (refMap[ref] || 0) + 1;
    });

    const referrers = Object.entries(refMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);

    // Real Devices
    const deviceMap: Record<string, number> = {};
    events.forEach((e) => {
      deviceMap[e.device] = (deviceMap[e.device] || 0) + 1;
    });

    const devices = Object.entries(deviceMap).map(([device, count]) => ({ device, count }));

    // Real Daily breakdown for last 7 days
    const dailyMap: Record<string, { views: number; ips: Set<string> }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split("T")[0];
      dailyMap[dateStr] = { views: 0, ips: new Set() };
    }

    events.forEach((e) => {
      const dateStr = new Date(e.timestamp).toISOString().split("T")[0];
      if (dailyMap[dateStr]) {
        dailyMap[dateStr].views += 1;
        dailyMap[dateStr].ips.add(e.ipHash || e.userAgent);
      }
    });

    const dailyViews = Object.entries(dailyMap).map(([date, val]) => ({
      date: date.substring(5), // MM-DD
      views: val.views,
      visitors: val.ips.size,
    }));

    const recentEvents = [...events].reverse().slice(0, 30);

    return {
      totalViews,
      uniqueVisitors,
      todayViews,
      topProjects,
      referrers,
      devices,
      dailyViews,
      recentEvents,
    };
  } catch {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      topProjects: [],
      referrers: [],
      devices: [],
      dailyViews: [],
      recentEvents: [],
    };
  }
}
