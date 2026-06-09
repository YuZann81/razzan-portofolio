const tools = ["Next.js", "Laravel", "TypeScript", "Tailwind CSS", "PostgreSQL", "GitHub", "Vercel", "Cloudflare"];

export default function About() {
  return (
    <section id="about" className="border-t border-[var(--border)] bg-white px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-sm leading-[1.3] text-[var(--accent)]">about</p>
          </div>

          <div className="md:col-span-9">
            <h2 className="max-w-5xl text-[48px] font-normal leading-[0.9] tracking-[-0.04em] text-[var(--foreground)] md:text-[96px]">I build practical digital products with clean structure.</h2>

            <div className="mt-12 grid gap-8 border-t border-[var(--border)] pt-8 md:grid-cols-9">
              <div className="md:col-span-5">
                <p className="text-[18px] leading-[1.5] text-[var(--muted)] md:text-[22px]">
                  I am a software engineering student focused on web development, interface structure, and product thinking. I like turning ideas into useful applications that solve real problems.
                </p>

                <p className="mt-6 text-[16px] leading-[1.5] text-[var(--muted)] md:text-[18px]">
                  My work usually explores education platforms, dashboards, automation concepts, and community-based systems. I care about clarity, maintainability, and making products that are easy to understand.
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="font-mono text-sm text-[var(--placeholder)]">tools / stack</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span key={tool} className="border border-[var(--border)] px-3 py-2 font-mono text-sm text-[var(--foreground)]">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-[var(--border)] pt-6">
                  <p className="font-mono text-sm leading-[1.5] text-[var(--placeholder)]">
                    based in indonesia
                    <br />
                    student developer
                    <br />
                    web / product / interface
                  </p>
                </div>
              </div>
            </div>

            <a href="#works" className="mt-8 inline-flex font-mono text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-secondary)]">
              view selected works →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
