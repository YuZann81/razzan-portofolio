const contactLinks = [
  {
    label: "email",
    value: "razzan.gianni@gmail.com",
    href: "mailto:razzan.gianni@gmail.com",
  },
  {
    label: "github",
    value: "YuZann81",
    href: "https://github.com/YuZann81",
  },
  {
    label: "website",
    value: "razzan.site",
    href: "https://razzan.site",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-[var(--border)] bg-[var(--surface-dark)] px-4 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-sm leading-[1.3] text-white">contact</p>
          </div>

          <div className="md:col-span-9">
            <h2 className="max-w-5xl text-[48px] font-normal leading-[0.9] tracking-[-0.04em] text-white md:text-[96px]">Let&apos;s build something useful.</h2>

            <div className="mt-12 border-t border-[#424242]">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="grid gap-4 border-b border-[#424242] py-6 transition-colors hover:text-[var(--accent-secondary)] md:grid-cols-9"
                >
                  <span className="font-mono text-sm text-[#9E9E9E] md:col-span-2">{link.label}</span>

                  <span className="text-[24px] font-normal leading-[1.1] tracking-[-0.03em] md:col-span-7 md:text-[48px]">{link.value}</span>
                </a>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-[16px] leading-[1.5] text-[#E0E0E0] md:text-[18px]">Open for collaboration, school projects, web development ideas, and practical product experiments.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
