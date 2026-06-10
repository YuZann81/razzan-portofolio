import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Razzan Gianni",
    template: "%s | Razzan Gianni",
  },
  description: "Personal portfolio of Razzan Gianni, a software engineering student focused on web development, interface design, and practical digital products.",
  keywords: ["Razzan Gianni", "portfolio", "web developer", "software engineering student", "Next.js", "Laravel", "Tailwind CSS"],
  authors: [{ name: "Razzan Gianni" }],
  creator: "Razzan Gianni",
  metadataBase: new URL("https://razzan.site"),
  openGraph: {
    title: "Razzan Gianni",
    description: "Personal portfolio of Razzan Gianni, focused on web development, interface design, and practical digital products.",
    url: "https://razzan.site",
    siteName: "Razzan Gianni",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Razzan Gianni",
    description: "Personal portfolio of Razzan Gianni, focused on web development, interface design, and practical digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
