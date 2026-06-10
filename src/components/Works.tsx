import { works } from "@/data/works";
export default function Works() {
  return (
    <section id="works" className="border-t border-[var(--border)] bg-white px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-sm leading-[1.3] text-[var(--accent)]">works</p>
          </div>

          <div className="md:col-span-9">
            <h2 className="max-w-4xl text-[48px] font-normal leading-[0.9] tracking-[-0.04em] text-[var(--foreground)] md:text-[96px]">Selected projects</h2>

            <div className="mt-12 border-t border-[var(--border)]">
              {works.map((work) => (
                <article key={work.number} className="grid gap-6 border-b border-[var(--border)] py-8 md:grid-cols-9 md:py-10">
                  <div className="md:col-span-1">
                    <p className="font-mono text-sm text-[var(--placeholder)]">{work.number}</p>
                  </div>

                  <div className="md:col-span-5">
                    <h3 className="text-[32px] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--foreground)] md:text-[48px]">{work.title}</h3>
                    <p className="mt-3 font-mono text-sm text-[var(--accent)]">{work.type}</p>
                  </div>

                  <div className="md:col-span-3">
                    <p className="text-[16px] leading-[1.5] text-[var(--muted)] md:text-[18px]">{work.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <a href="#contact" className="mt-8 inline-flex font-mono text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-secondary)]">
              discuss a project →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
