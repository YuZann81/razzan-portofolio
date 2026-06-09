export default function Hero() {
  return (
    <section id="hero" className="mx-auto grid min-h-[calc(100vh-89px)] max-w-[1200px] items-end px-4 py-16 md:px-10 md:py-24">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="font-mono text-sm leading-[1.3] text-[var(--accent)]">personal portfolio</p>
        </div>

        <div className="md:col-span-9">
          <h1 className="max-w-5xl text-[64px] font-normal leading-[0.85] tracking-[-0.06em] text-[var(--foreground)] sm:text-[96px] md:text-[128px] lg:text-[164px]">Razzan Gianni</h1>

          <div className="mt-10 grid gap-8 border-t border-[var(--border)] pt-8 md:grid-cols-9">
            <p className="text-[18px] leading-[1.4] text-[var(--muted)] md:col-span-5 md:text-[22px]">A personal portfolio for showcasing selected works, technical skills, and development journey.</p>

            <div className="space-y-3 font-mono text-sm leading-[1.3] text-[var(--placeholder)] md:col-span-4">
              <p>software engineering student</p>
              <p>web development / interface design</p>
              <p>next.js / laravel / product thinking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
