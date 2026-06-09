const navItems = [
  { label: "works", href: "#works" },
  { label: "approach", href: "#approach" },
  { label: "services", href: "#services" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-5 md:px-10 md:py-6">
        <a href="#hero" className="font-mono text-sm text-[var(--foreground)] transition-colors hover:text-[var(--accent)]">
          razzan gianni
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="px-4 py-3 font-mono text-sm lowercase text-[var(--placeholder)] transition-colors hover:text-[var(--accent)]">
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="font-mono text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-secondary)]">
          contact
        </a>
      </nav>
    </header>
  );
}
