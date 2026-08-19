import fs from "fs";
import path from "path";
import { Project, PROJECTS as INITIAL_PROJECTS } from "../data/works";

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");

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

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(INITIAL_PROJECTS, null, 2), "utf-8");
  }

  if (!fs.existsSync(ANALYTICS_FILE)) {
    const initialEvents: PageViewEvent[] = [];
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(initialEvents, null, 2), "utf-8");
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

    // Keep last 10,000 events
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
