import { notFound } from "next/navigation";
import Link from "next/link";
import NavbarWrapper from "./NavbarWrapper";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getProjectBySlug, getAllProjects } from "@/lib/db";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug || p.id === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <SmoothScroll>
      <AnalyticsTracker />
      <div className="relative min-h-screen w-full bg-theme text-theme-fg selection:bg-theme-accent selection:text-white transition-colors">
        <NavbarWrapper />

        <main className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
          {/* Breadcrumbs */}
          <div className="mb-6 sm:mb-8 flex items-center gap-2 font-mono text-xs text-theme-muted">
            <Link href="/" className="flex items-center gap-1 hover:text-theme-fg transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>HOME</span>
            </Link>
            <span className="text-theme-dim">/</span>
            <Link href="/project" className="hover:text-theme-fg transition-colors">
              PROJECTS
            </Link>
            <span className="text-theme-dim">/</span>
            <span className="text-theme-accent font-semibold">{project.slug}</span>
          </div>

          {/* Project Title & Metadata Header */}
          <AnimateOnScroll direction="up">
            <div className="border-b border-theme pb-8">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="bg-theme-fg px-2.5 py-0.5 text-theme-card font-medium">
                  {project.category}
                </span>
                <span className="text-theme-dim">/</span>
                <span className="text-theme-muted">{project.role}</span>
                <span className="text-theme-dim">/</span>
                <span className="text-theme-dim">{project.year}</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-theme-fg">
                {project.title}
              </h1>

              <p className="mt-2 text-base sm:text-xl font-mono text-theme-muted">
                {project.subtitle}
              </p>

              {/* Action Links */}
              <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-theme bg-theme-fg px-4 py-2.5 text-theme-card hover:bg-theme-accent transition-all"
                    style={{ borderRadius: "0px" }}
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-theme bg-theme-card px-4 py-2.5 text-theme-fg hover:border-theme-fg transition-colors"
                    style={{ borderRadius: "0px" }}
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                )}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Performance Benchmark Metrics Banner */}
          <AnimateOnScroll direction="up" delay={100}>
            <div className="my-8 border border-theme bg-theme-sec p-5 font-mono">
              <div className="flex items-center justify-between border-b border-theme pb-2 text-xs text-theme-dim">
                <span>BENCHMARK_TELEMETRY</span>
                <span className="text-theme-accent font-semibold">VERIFIED</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="border-l-2 border-theme-accent pl-3">
                    <div className="text-[10px] sm:text-xs text-theme-dim uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="mt-1 text-base sm:text-xl font-bold text-theme-fg">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Problem Statement & Architecture Deep-Dive */}
          <AnimateOnScroll direction="up" delay={200}>
            <div className="my-10 space-y-6">
              <div>
                <h2 className="flex items-center gap-2 font-mono text-xs font-semibold text-theme-fg uppercase tracking-wider">
                  <Terminal className="h-3.5 w-3.5 text-theme-accent" />
                  <span>{"// SYSTEM ARCHITECTURE & SPECIFICATION"}</span>
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-theme-muted">
                  {project.description}
                </p>
              </div>

              {/* Engineering Highlights */}
              <div className="border-t border-theme pt-6">
                <h3 className="font-mono text-xs font-semibold text-theme-fg uppercase tracking-wider">
                  {"// KEY ENGINEERING HIGHLIGHTS"}
                </h3>
                <ul className="mt-4 space-y-3 font-sans text-sm sm:text-base text-theme-muted">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Arsenal */}
              <div className="border-t border-theme pt-6">
                <h3 className="font-mono text-xs font-semibold text-theme-fg uppercase tracking-wider">
                  {"// TECHNOLOGY ARSENAL"}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-theme bg-theme-card px-3 py-1 font-mono text-xs text-theme-fg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Bottom Next / Prev Navigation */}
          <div className="mt-16 border-t border-theme pt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 font-mono text-xs">
            {prevProject ? (
              <Link
                href={`/project/${prevProject.slug}`}
                className="border border-theme bg-theme-card p-4 transition-colors hover:border-theme-fg group"
              >
                <div className="text-[10px] text-theme-dim flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" />
                  <span>PREVIOUS SYSTEM</span>
                </div>
                <div className="mt-1 font-medium text-sm text-theme-fg group-hover:text-theme-accent transition-colors">
                  {prevProject.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/project/${nextProject.slug}`}
                className="border border-theme bg-theme-card p-4 transition-colors hover:border-theme-fg text-right group"
              >
                <div className="text-[10px] text-theme-dim flex items-center justify-end gap-1">
                  <span>NEXT SYSTEM</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
                <div className="mt-1 font-medium text-sm text-theme-fg group-hover:text-theme-accent transition-colors">
                  {nextProject.title}
                </div>
              </Link>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
