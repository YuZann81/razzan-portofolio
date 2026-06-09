const approachItems = [
  {
    number: "01",
    title: "Understand",
    description: "Start from the problem, user needs, and project goals before thinking about visuals or implementation.",
  },
  {
    number: "02",
    title: "Structure",
    description: "Break the product into clear sections, flows, components, and data before writing the final interface.",
  },
  {
    number: "03",
    title: "Build",
    description: "Turn the structure into a working product with clean code, responsive layout, and maintainable decisions.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="border-t border-[var(--border)] bg-white px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-sm leading-[1.3] text-[var(--accent)]">approach</p>
          </div>

          <div className="md:col-span-9">
            <h2 className="max-w-4xl text-[48px] font-normal leading-[0.9] tracking-[-0.04em] text-[var(--foreground)] md:text-[96px]">Clear thinking before clean execution</h2>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {approachItems.map((item) => (
                <article key={item.number} className="border border-[var(--border)] bg-white p-6 md:p-10">
                  <p className="font-mono text-sm text-[var(--placeholder)]">{item.number}</p>

                  <h3 className="mt-12 text-[28px] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--foreground)] md:text-[40px]">{item.title}</h3>

                  <p className="mt-6 text-[16px] leading-[1.5] text-[var(--muted)]">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 border-t border-[var(--border)] pt-8">
              <p className="max-w-3xl text-[18px] leading-[1.5] text-[var(--muted)] md:text-[22px]">
                I prefer building products with a simple rule: make the idea understandable first, then make the interface useful, fast, and easy to maintain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
