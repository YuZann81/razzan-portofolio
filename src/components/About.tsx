"use client";

import { useState, useRef } from "react";
import { Shield, Zap, Terminal, Code2, Cpu, CheckCircle2, Layers } from "lucide-react";
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
} from "./Icons";
import { useSoundFX } from "../hooks/useSoundFX";
import AnimateOnScroll from "./AnimateOnScroll";

interface TechItem {
  name: string;
  category: "languages" | "systems" | "frontend";
  icon: React.ComponentType<{ className?: string }>;
  level: string;
  proficiency: number;
  specialization: string;
  desc: string;
}

export default function About() {
  const { playHover, playClick } = useSoundFX();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const techStack: TechItem[] = [
    {
      name: "TypeScript",
      category: "languages",
      icon: TypeScriptIcon,
      level: "Expert",
      proficiency: 98,
      specialization: "Type-Level Metaprogramming & AST Transforms",
      desc: "Strict type contracts, generic variance, branded types, and high-performance Next.js application runtimes.",
    },
    {
      name: "Go (Golang)",
      category: "languages",
      icon: GoIcon,
      level: "Advanced",
      proficiency: 94,
      specialization: "Zero-Allocation Memory Pools & Goroutines",
      desc: "High-concurrency microservices, gRPC stream multiplexing, and custom event broker pipelines.",
    },
    {
      name: "Rust",
      category: "languages",
      icon: RustIcon,
      level: "Intermediate",
      proficiency: 82,
      specialization: "Memory Safety & WebAssembly Compute",
      desc: "Zero-cost abstractions, memory safety without GC overhead, and low-latency systems programming.",
    },
    {
      name: "Python",
      category: "languages",
      icon: PythonIcon,
      level: "Advanced",
      proficiency: 90,
      specialization: "Vector Search & Multi-Agent Orchestration",
      desc: "Async FastAPI backends, semantic embedding indexing, and deterministic LLM tool validation.",
    },
    {
      name: "Next.js 16",
      category: "frontend",
      icon: NextjsIcon,
      level: "Expert",
      proficiency: 96,
      specialization: "App Router & Server Components SSR",
      desc: "Turbopack builds, dynamic edge routes, optimistic mutations, and zero-bundle server logic.",
    },
    {
      name: "React 19",
      category: "frontend",
      icon: ReactIcon,
      level: "Expert",
      proficiency: 96,
      specialization: "Concurrent Rendering & Action Hooks",
      desc: "Deterministic state management, useSyncExternalStore primitives, and Lighthouse 100 optimization.",
    },
    {
      name: "PostgreSQL 17",
      category: "systems",
      icon: PostgreSqlIcon,
      level: "Expert",
      proficiency: 92,
      specialization: "ACID Isolation & Complex Index Tuning",
      desc: "Query plan analysis (EXPLAIN ANALYZE), table partitioning, connection pooling, and read-replicas.",
    },
    {
      name: "Redis 7.2",
      category: "systems",
      icon: RedisIcon,
      level: "Expert",
      proficiency: 94,
      specialization: "Distributed Locks & Atomic Token Buckets",
      desc: "High-throughput in-memory caching topologies, pub/sub channels, and sub-millisecond key-value lookups.",
    },
    {
      name: "Apache Kafka",
      category: "systems",
      icon: KafkaIcon,
      level: "Advanced",
      proficiency: 88,
      specialization: "Partition Strategies & Consumer Balancing",
      desc: "Event sourcing, distributed log serialization, backpressure handling, and real-time data streaming.",
    },
    {
      name: "Docker & Linux",
      category: "systems",
      icon: DockerIcon,
      level: "Advanced",
      proficiency: 90,
      specialization: "MicroVM Sandboxing & Multi-Stage Builds",
      desc: "Minimal container images, Linux kernel primitives, systemd orchestration, and CI/CD pipelines.",
    },
    {
      name: "Tailwind CSS v4",
      category: "frontend",
      icon: TailwindIcon,
      level: "Expert",
      proficiency: 98,
      specialization: "Modern Design Tokens & Mathematical Grids",
      desc: "Zero-runtime CSS variable architecture, dark/light theme tokens, and responsive layout math.",
    },
    {
      name: "Web Canvas 2D / Audio",
      category: "frontend",
      icon: Cpu,
      level: "Advanced",
      proficiency: 88,
      specialization: "120 FPS Physics & Synthesized Audio",
      desc: "Interactive particle gravitation, inertial lerp math, and zero-latency Web Audio soundscapes.",
    },
  ];

  const categories = [
    { key: "all", label: "All Arsenal (12)" },
    { key: "languages", label: "Core Languages" },
    { key: "systems", label: "Backend & Systems Infra" },
    { key: "frontend", label: "Frontend & Performance" },
  ];

  const filteredStack =
    activeCategory === "all"
      ? techStack
      : techStack.filter((item) => item.category === activeCategory);

  return (
    <section id="about" className="relative w-full border-b border-theme bg-theme-sec py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="flex items-center gap-2 font-mono text-xs text-theme-muted">
            <span>[01]</span>
            <span className="uppercase tracking-wider">ENGINEER PROFILE &amp; PHILOSOPHY</span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-5xl font-normal tracking-tight text-theme-fg">
            Who is <span className="font-serif italic font-normal text-theme-accent">Razzan Gianni</span>?
          </h2>
          <p className="mt-1 max-w-3xl text-sm sm:text-base text-theme-muted font-sans leading-relaxed">
            Software Engineer &amp; Systems Architect with a background in <span className="text-theme-fg font-medium">Rekayasa Perangkat Lunak (Software Engineering)</span>. Committed to building robust distributed runtimes and immaculate, high-speed web experiences.
          </p>
        </AnimateOnScroll>

        {/* Narrative & Impact Badges Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
          <AnimateOnScroll direction="up" delay={50}>
            <div className="border border-theme bg-theme-card p-5 h-full flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <div className="flex items-center justify-between text-theme-dim text-[11px]">
                <span>SPECIALIZATION</span>
                <Code2 className="h-4 w-4 text-theme-accent" />
              </div>
              <div className="mt-3">
                <div className="text-base font-bold text-theme-fg">Distributed Systems</div>
                <p className="mt-1 text-[11px] text-theme-muted font-sans">
                  High-throughput Go &amp; Rust brokers with sub-millisecond p99 latency.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={100}>
            <div className="border border-theme bg-theme-card p-5 h-full flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <div className="flex items-center justify-between text-theme-dim text-[11px]">
                <span>ARCHITECTURAL STANCE</span>
                <Zap className="h-4 w-4 text-theme-accent" />
              </div>
              <div className="mt-3">
                <div className="text-base font-bold text-theme-fg">Zero Bloatware</div>
                <p className="mt-1 text-[11px] text-theme-muted font-sans">
                  Refuse artificial dependencies. Ship lean, self-contained primitives.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={150}>
            <div className="border border-theme bg-theme-card p-5 h-full flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <div className="flex items-center justify-between text-theme-dim text-[11px]">
                <span>RELIABILITY SPEC</span>
                <Shield className="h-4 w-4 text-theme-accent" />
              </div>
              <div className="mt-3">
                <div className="text-base font-bold text-theme-fg">Deterministic State</div>
                <p className="mt-1 text-[11px] text-theme-muted font-sans">
                  Formal schema contracts and chaos-tested failure boundaries.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={200}>
            <div className="border border-theme bg-theme-card p-5 h-full flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <div className="flex items-center justify-between text-theme-dim text-[11px]">
                <span>WEB EXPERIENCE</span>
                <Layers className="h-4 w-4 text-theme-accent" />
              </div>
              <div className="mt-3">
                <div className="text-base font-bold text-theme-fg">Sensory Frontends</div>
                <p className="mt-1 text-[11px] text-theme-muted font-sans">
                  Lighthouse 100 scores, micro-audio feedback, and fluid 120 FPS canvas.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* --- SPOTLIGHT BENTO TECH ARSENAL SECTION --- */}
        <div className="mt-14 sm:mt-16">
          <AnimateOnScroll direction="up">
            <div className="flex flex-col justify-between gap-4 border-b border-theme pb-5 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-theme-dim">
                  <Terminal className="h-3.5 w-3.5 text-theme-accent" />
                  <span>{"// TECHNICAL ARSENAL & CAPABILITIES"}</span>
                </div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-medium text-theme-fg">
                  Engineered with <span className="font-serif italic font-normal text-theme-muted">Battle-Tested Primitives</span>
                </h3>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] sm:text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      playClick();
                      setActiveCategory(cat.key);
                    }}
                    onMouseEnter={() => playHover()}
                    className={`border px-3 py-1.5 transition-all cursor-pointer ${
                      activeCategory === cat.key
                        ? "border-theme-fg bg-theme-fg text-theme-card font-bold shadow-sm"
                        : "border-theme bg-theme-card text-theme-muted hover:border-theme-fg hover:text-theme-fg"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Interactive Mouse Spotlight Bento Grid */}
          <div
            ref={gridRef}
            onMouseMove={handleMouseMove}
            className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredStack.map((tech, idx) => {
              const Icon = tech.icon;

              return (
                <AnimateOnScroll key={tech.name} direction="up" delay={idx * 60}>
                  <div
                    onMouseEnter={() => playHover()}
                    className="group relative border border-theme bg-theme-card p-5 transition-all duration-300 hover:border-theme-fg hover:shadow-xl h-full flex flex-col justify-between overflow-hidden"
                    style={{ borderRadius: "0px" }}
                  >
                    {/* Spotlight Glow Follower */}
                    <div
                      className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 102, 255, 0.08), transparent 40%)`,
                      }}
                    />

                    <div>
                      {/* Card Header: Icon + Title + Level */}
                      <div className="flex items-start justify-between border-b border-theme pb-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center border border-theme bg-theme-sec text-theme-fg group-hover:text-theme-accent group-hover:border-theme-accent transition-colors shadow-xs">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-theme-fg group-hover:text-theme-accent transition-colors">
                              {tech.name}
                            </h4>
                            <div className="font-mono text-[10px] text-theme-dim uppercase tracking-wider">
                              {tech.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 font-mono text-[11px] text-theme-muted">
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          <span>{tech.level}</span>
                        </div>
                      </div>

                      {/* Specialization Badge */}
                      <div className="mt-3.5 inline-block border border-theme bg-theme-sec px-2 py-0.5 font-mono text-[10px] text-theme-accent font-medium">
                        {tech.specialization}
                      </div>

                      {/* Description */}
                      <p className="mt-2.5 text-xs text-theme-muted font-sans leading-relaxed">
                        {tech.desc}
                      </p>
                    </div>

                    {/* Proficiency Progress Bar */}
                    <div className="mt-5 border-t border-theme pt-3.5 font-mono text-[10px]">
                      <div className="flex justify-between text-theme-dim mb-1">
                        <span>PROFICIENCY</span>
                        <span className="font-bold text-theme-fg">{tech.proficiency}%</span>
                      </div>
                      <div className="h-1 w-full bg-theme-sec overflow-hidden">
                        <div
                          className="h-full bg-theme-accent transition-all duration-500 ease-out"
                          style={{ width: `${tech.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
