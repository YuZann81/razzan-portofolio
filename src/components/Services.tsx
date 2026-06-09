const services = [
  {
    title: "Web application",
    description: "Build structured web apps with clear pages, reusable components, authentication flow, and clean user experience.",
  },
  {
    title: "Landing page",
    description: "Create focused landing pages with strong information hierarchy, responsive layout, and clear call-to-action.",
  },
  {
    title: "Dashboard interface",
    description: "Design admin or user dashboards with readable data, organized navigation, and practical interaction patterns.",
  },
  {
    title: "School platform",
    description: "Develop education-focused platforms for announcements, assignments, forums, materials, and communication.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-[var(--border)] bg-white px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-sm leading-[1.3] text-[var(--accent)]">services</p>
          </div>

          <div className="md:col-span-9">
            <h2 className="max-w-4xl text-[48px] font-normal leading-[0.9] tracking-[-0.04em] text-[var(--foreground)] md:text-[96px]">Things I can build</h2>

            <div className="mt-12 border-t border-[var(--border)]">
              {services.map((service) => (
                <article key={service.title} className="grid gap-6 border-b border-[var(--border)] py-8 md:grid-cols-9 md:py-10">
                  <div className="md:col-span-4">
                    <h3 className="text-[28px] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--foreground)] md:text-[48px]">{service.title}</h3>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[16px] leading-[1.5] text-[var(--muted)] md:text-[18px]">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-[16px] leading-[1.5] text-[var(--muted)]">Focused on practical products, clean structure, and interfaces that are easy to understand.</p>

              <a href="#contact" className="font-mono text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-secondary)]">
                start a build →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
