"use client";

import { useState } from "react";
import { Server, Layout, BrainCircuit, Activity, Check } from "lucide-react";
import { useSoundFX } from "../hooks/useSoundFX";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Services() {
  const { playHover, playClick } = useSoundFX();
  const [selectedService, setSelectedService] = useState<number>(0);

  const services = [
    {
      id: "01",
      icon: Server,
      title: "Distributed Backend & Systems",
      subtitle: "High-throughput, event-driven backends with sub-millisecond latency",
      deliverables: [
        "Event streaming architectures (Kafka, RabbitMQ, Go)",
        "gRPC & REST microservice design with strict schema contracts",
        "Database optimization, read-replicas, and ACID caching layers",
        "MicroVM & containerized orchestration (Docker, K8s)",
      ],
      stack: ["Go", "Rust", "PostgreSQL", "Redis", "Kafka"],
    },
    {
      id: "02",
      icon: Layout,
      title: "Modern Web Interfaces & Systems",
      subtitle: "Zero-latency, accessible, and kinetic frontends built for scale",
      deliverables: [
        "Next.js App Router applications with Server Components & SSR",
        "Deterministic design systems adhering to strict mathematical grids",
        "Micro-interactions & sensory web experiences (Web Audio, Canvas)",
        "Flawless Lighthouse 100 performance & WCAG AA accessibility",
      ],
      stack: ["React 19", "Next.js", "TypeScript", "Tailwind CSS v4"],
    },
    {
      id: "03",
      icon: BrainCircuit,
      title: "AI Workflows & Deterministic Reasoning",
      subtitle: "Deterministic agentic pipelines and vector retrieval engines",
      deliverables: [
        "Multi-agent task orchestration with tool validation",
        "Custom vector search indexing and hybrid semantic rerankers",
        "Structured output parsing & hallucination mitigation",
        "FastAPI & async Python inference endpoints",
      ],
      stack: ["Python", "FastAPI", "Vector DBs", "LangChain", "OpenAI / Claude"],
    },
    {
      id: "04",
      icon: Activity,
      title: "Architecture Review & Performance Tuning",
      subtitle: "Deep-dive audit into bottlenecks, memory leaks, and GC overhead",
      deliverables: [
        "End-to-end profiling (CPU flame graphs, memory allocations)",
        "Frontend bundle reduction and cold-start time optimization",
        "Security audit, token lifecycle analysis, and vulnerability patching",
        "Comprehensive architectural blueprint & refactoring roadmap",
      ],
      stack: ["DevTools", "eBPF", "Lighthouse", "Load Testing (k6)"],
    },
  ];

  return (
    <section id="services" className="relative w-full border-b border-theme bg-theme py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="flex items-center gap-2 font-mono text-xs text-theme-muted">
            <span>[03]</span>
            <span className="uppercase tracking-wider">CAPABILITIES & SERVICES</span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-theme-fg">
            Engineered for <span className="font-serif italic font-normal text-theme-muted">Extreme Reliability</span> &amp; Speed
          </h2>
        </AnimateOnScroll>

        {/* Interactive Services Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isSelected = selectedService === idx;

            return (
              <AnimateOnScroll key={service.id} direction="up" delay={idx * 100}>
                <div
                  onClick={() => {
                    playClick();
                    setSelectedService(idx);
                  }}
                  onMouseEnter={() => playHover()}
                  className={`border p-5 sm:p-6 transition-all cursor-pointer h-full flex flex-col justify-between ${
                    isSelected
                      ? "border-theme-fg bg-theme-sec shadow-sm"
                      : "border-theme bg-theme-card hover:border-theme-fg"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-theme pb-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-theme-dim">
                        <span className="text-theme-fg font-bold">SERVICE // {service.id}</span>
                      </div>
                      <Icon className={`h-4 w-4 ${isSelected ? "text-theme-fg" : "text-theme-muted"}`} />
                    </div>

                    <h3 className="mt-4 text-lg sm:text-xl font-medium text-theme-fg">{service.title}</h3>
                    <p className="mt-1 font-mono text-xs text-theme-muted leading-relaxed">
                      {service.subtitle}
                    </p>

                    {/* Deliverables List */}
                    <div className="mt-5 border-t border-theme pt-4">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-theme-dim">
                        Deliverables:
                      </div>
                      <ul className="mt-2 space-y-1.5 font-mono text-xs text-theme-muted">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-theme-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stack Badges */}
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-theme pt-4">
                    {service.stack.map((st) => (
                      <span
                        key={st}
                        className="border border-theme bg-theme-card px-2 py-0.5 font-mono text-[10px] text-theme-fg"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
