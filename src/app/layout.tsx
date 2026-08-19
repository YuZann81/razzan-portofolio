import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Razzan Gianni — Software Engineer & Systems Architect",
  description:
    "Personal portfolio of Razzan Gianni. Minimalist, engineer-driven portfolio featuring high-throughput distributed systems, modern web engineering, and AI agent architectures.",
  keywords: [
    "Razzan Gianni",
    "Software Engineer",
    "Systems Architect",
    "Distributed Systems",
    "Next.js",
    "TypeScript",
    "React",
    "Go",
    "Rust",
  ],
  authors: [{ name: "Razzan Gianni" }],
  creator: "Razzan Gianni",
  openGraph: {
    title: "Razzan Gianni — Software Engineer & Systems Architect",
    description:
      "Minimalist, engineer-driven portfolio featuring high-throughput distributed systems, modern web engineering, and AI agent architectures.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#080808]">
      <body
        className="antialiased bg-theme text-theme-fg font-sans selection:bg-theme-accent selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
