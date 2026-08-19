"use client";

import { useState } from "react";
import { useSoundFX } from "../hooks/useSoundFX";
import { Terminal, ShieldAlert, Cpu, GitPullRequest } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Approach() {
  const { playHover, playClick } = useSoundFX();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: "01",
      title: "Invariant & Domain Modeling",
      icon: Terminal,
      summary: "Define mathematical constraints, boundary conditions, and state transitions before writing code.",
      details:
        "Every system failure is usually an unhandled state transition. We formalize schema contracts, idempotency guarantees, and data flows using strict types and formal interface specifications.",
      codeSnippet: `type Invariant<T> = Readonly<T> & { readonly _brand: unique symbol };
// Ensure zero unhandled edge states at compile-time`,
    },
    {
      num: "02",
      title: "Micro-Benchmarking & Profiling",
      icon: Cpu,
      summary: "Measure memory allocations, CPU cycles, and latency percentiles before choosing architectures.",
      details:
        "Instead of guessing, we run isolated benchmark suites to profile cache misses, allocations, and GC overhead. Systems are built around realistic worst-case p99 scenarios.",
      codeSnippet: `func BenchmarkThroughput(b *testing.B) {
  b.ReportAllocs()
  // target: 0 allocs/op in hot loop
}`,
    },
    {
      num: "03",
      title: "Zero-Bloat Implementation",
      icon: GitPullRequest,
      summary: "Refuse unnecessary libraries. Ship clean, self-contained, and highly maintainable primitives.",
      details:
        "Modern software is weighed down by excessive dependencies. Every line added is a liability. We favor lean native APIs, modular composability, and explicit error handling.",
      codeSnippet: `// Pure function, zero side-effects
export const sanitize = (input: Buffer): Result<Payload> => ...`,
    },
    {
      num: "04",
      title: "Chaos Verification & Telemetry",
      icon: ShieldAlert,
      summary: "Subject systems to simulated packet drops, race conditions, and high-concurrency spikes.",
      details:
        "Deploying is only half the battle. We instrument real-time telemetry, structured JSON logs, tracing spans, and test failure recovery under heavy load.",
      codeSnippet: `rate(http_requests_total{status=~"5.."}[5m]) == 0
// Deterministic SLA monitoring`,
    },
  ];

  return (
    <section id="approach" className="relative w-full border-b border-theme bg-theme-sec py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="flex items-center gap-2 font-mono text-xs text-theme-muted">
            <span>[04]</span>
            <span className="uppercase tracking-wider">ENGINEERING METHODOLOGY</span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-theme-fg">
            Deterministic Execution{" "}
            <span className="font-serif italic font-normal text-theme-muted">&amp; Methodology</span>
          </h2>
        </AnimateOnScroll>

        {/* Steps Grid & Detail Box */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Steps List */}
          <div className="space-y-3.5 sm:space-y-4 lg:col-span-6">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              const Icon = step.icon;

              return (
                <AnimateOnScroll key={step.num} direction="up" delay={idx * 80}>
                  <div
                    onClick={() => {
                      playClick();
                      setActiveStep(idx);
                    }}
                    onMouseEnter={() => playHover()}
                    className={`border p-4 sm:p-5 transition-all cursor-pointer ${
                      isCurrent
                        ? "border-theme-fg bg-theme-card shadow-sm"
                        : "border-theme bg-theme-card/60 hover:border-theme-fg"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isCurrent ? "text-theme-fg" : "text-theme-dim"
                          }`}
                        >
                          PHASE // {step.num}
                        </span>
                        <h3 className="text-sm sm:text-base font-medium text-theme-fg">{step.title}</h3>
                      </div>
                      <Icon className={`h-4 w-4 ${isCurrent ? "text-theme-fg" : "text-theme-dim"}`} />
                    </div>
                    <p className="mt-2 font-mono text-xs text-theme-muted leading-relaxed">
                      {step.summary}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* Right Inspector Box */}
          <div className="lg:col-span-6">
            <AnimateOnScroll direction="left" delay={200}>
              <div className="sticky top-24 sm:top-28 border border-theme bg-theme-card p-5 sm:p-6 shadow-md" style={{ borderRadius: "0px" }}>
                <div className="flex items-center justify-between border-b border-theme pb-3 font-mono text-xs">
                  <span className="text-theme-fg font-semibold">
                    DEEP_DIVE // PHASE_{steps[activeStep].num}
                  </span>
                  <span className="text-theme-dim">EXECUTION_SPEC</span>
                </div>

                <h4 className="mt-4 text-lg sm:text-xl font-medium text-theme-fg">
                  {steps[activeStep].title}
                </h4>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-theme-muted leading-relaxed">
                  {steps[activeStep].details}
                </p>

                {/* Code Snippet Box */}
                <div className="mt-5 border border-theme bg-neutral-900 p-3.5 sm:p-4 font-mono text-xs text-white">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-white/50">
                    <span>SPECIFICATION_OUTPUT</span>
                    <span className="text-emerald-400">PASSED</span>
                  </div>
                  <pre className="mt-3 overflow-x-auto text-[10px] sm:text-[11px] text-zinc-300">
                    <code>{steps[activeStep].codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
