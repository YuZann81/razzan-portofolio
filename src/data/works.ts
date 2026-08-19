export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "Systems & Infrastructure" | "AI & Cloud" | "Open Source";
  year: string;
  role: string;
  client?: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "sentinel-core",
    slug: "sentinel-core",
    title: "Sentinel Distributed Core",
    subtitle: "High-throughput event streaming & telemetry orchestration engine",
    category: "Systems & Infrastructure",
    year: "2026",
    role: "Lead Systems Architect",
    client: "Internal Infra",
    description:
      "A zero-allocation event broker built with Go and Rust to ingest, serialize, and route millions of sensor & application logs per second with sub-millisecond p99 latency.",
    highlights: [
      "Custom memory pool architecture reducing GC pause time by 94%",
      "Distributed consensus layer with Raft protocol implementation",
      "Real-time WebSocket streaming dashboard with WebAssembly parsers",
    ],
    metrics: [
      { label: "Throughput", value: "2.4M msg/s" },
      { label: "p99 Latency", value: "< 1.2ms" },
      { label: "Memory Efficiency", value: "85% reduced" },
    ],
    tags: ["Go", "Rust", "WebAssembly", "Kafka", "Docker", "gRPC"],
    liveUrl: "https://github.com/YuZann81",
    githubUrl: "https://github.com/YuZann81",
    featured: true,
    image: "/next.svg",
  },
  {
    id: "nexus-cloud",
    slug: "nexus-cloud",
    title: "Nexus Developer Cloud",
    subtitle: "Multi-tenant edge computing platform & serverless orchestration",
    category: "Full Stack",
    year: "2025",
    role: "Full Stack Engineer",
    client: "Cloud Services",
    description:
      "A distributed edge runtime allowing instant deployment of serverless functions with isolated V8 sandboxes, automatic DNS routing, and sub-10ms global cold starts.",
    highlights: [
      "Built custom Next.js App Router developer console with real-time logs",
      "Integrated isolated V8 worker execution environments",
      "Automated global Anycast network routing and TLS termination",
    ],
    metrics: [
      { label: "Cold Start", value: "< 8.4ms" },
      { label: "Active Nodes", value: "140+ Edge" },
      { label: "Availability", value: "99.99%" },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Redis", "PostgreSQL"],
    liveUrl: "https://github.com/YuZann81",
    githubUrl: "https://github.com/YuZann81",
    featured: true,
    image: "/next.svg",
  },
  {
    id: "cortex-mesh",
    slug: "cortex-mesh",
    title: "Cortex AI Reasoning Mesh",
    subtitle: "Autonomous multi-agent orchestration for enterprise codebases",
    category: "AI & Cloud",
    year: "2025",
    role: "AI Engineer",
    client: "AI Research Labs",
    description:
      "A graph-based deterministic multi-agent framework that indexes complex monorepos, builds AST dependency trees, and coordinates LLMs to execute multi-step refactors safely.",
    highlights: [
      "Dynamic dependency graph extraction with Tree-sitter AST parsers",
      "Deterministic agent tool verification preventing hallucinated commands",
      "Semantic vector indexing using hybrid BM25 + embedding search",
    ],
    metrics: [
      { label: "Task Success", value: "94.2%" },
      { label: "Index Speed", value: "50k LOC/s" },
      { label: "Cost Efficiency", value: "4.2x reduced" },
    ],
    tags: ["Python", "FastAPI", "Vector DB", "LangChain", "OpenAI", "React"],
    liveUrl: "https://github.com/YuZann81",
    githubUrl: "https://github.com/YuZann81",
    featured: true,
    image: "/next.svg",
  },
  {
    id: "hyper-terminal",
    slug: "hyper-terminal",
    title: "Hyper Terminal UI",
    subtitle: "Blazing fast web-based terminal emulator with GPU acceleration",
    category: "Open Source",
    year: "2024",
    role: "Creator & Maintainer",
    client: "Open Source",
    description:
      "An ultra-minimalist web terminal emulator written with WebGL2 and TypeScript, delivering 120 FPS rendering, zero input lag, and full ANSI/xterm escape sequence fidelity.",
    highlights: [
      "Custom WebGL2 glyph texture atlas rendering pipeline",
      "Zero-latency WebSocket pty multiplexer backend in Go",
      "Over 1,200+ GitHub stars with active community contributors",
    ],
    metrics: [
      { label: "Render Frame", value: "120 FPS" },
      { label: "GitHub Stars", value: "1.2k+" },
      { label: "Bundle Size", value: "18 KB" },
    ],
    tags: ["TypeScript", "WebGL", "Go", "WebSocket", "Wasm"],
    liveUrl: "https://github.com/YuZann81",
    githubUrl: "https://github.com/YuZann81",
    featured: true,
    image: "/next.svg",
  },
];
