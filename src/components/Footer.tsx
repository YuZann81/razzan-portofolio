const footerLinks = [
  { label: "works", href: "#works" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#424242] bg-[var(--surface-dark)] px-4 py-8 text-white md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-sm text-[#9E9E9E]">© 2026 Razzan Gianni. All rights reserved.</p>

        <div className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className="font-mono text-sm text-[#9E9E9E] transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
