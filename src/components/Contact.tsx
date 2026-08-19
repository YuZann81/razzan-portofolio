"use client";

import { useState } from "react";
import { Send, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useSoundFX } from "../hooks/useSoundFX";
import AnimateOnScroll from "./AnimateOnScroll";
import confetti from "canvas-confetti";

export default function Contact() {
  const { playHover, playClick, playSuccess } = useSoundFX();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("razzan.gianni@gmail.com");
    setCopied(true);
    playSuccess();

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#0000EE", "#0066FF", "#FFFFFF"],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccess();
      setFormData({ name: "", email: "", message: "" });

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#0000EE", "#0066FF", "#FFFFFF"],
        });
      } catch {
        // Confetti fallback
      }
    }, 800);
  };

  return (
    <section id="contact" className="relative w-full border-b border-theme bg-theme py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="flex items-center gap-2 font-mono text-xs text-theme-muted">
            <span>[05]</span>
            <span className="uppercase tracking-wider">INITIATE TRANSMISSION</span>
          </div>
        </AnimateOnScroll>

        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Outreach & Coordinates */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <AnimateOnScroll direction="up" delay={100}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-theme-fg">
                Let&apos;s engineer{" "}
                <span className="font-serif italic font-normal text-theme-muted">something remarkable.</span>
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll direction="up" delay={200}>
              <p className="text-sm sm:text-base text-theme-muted leading-relaxed">
                Whether you need high-scale distributed backend architecture, high-performance web engineering, or a consultation on technical strategy—I am open to compelling opportunities and engineering collaborations.
              </p>
            </AnimateOnScroll>

            {/* Quick Copy Email Box */}
            <AnimateOnScroll direction="up" delay={300}>
              <div className="border border-theme bg-theme-sec p-4 sm:p-5">
                <div className="flex items-center justify-between font-mono text-xs text-theme-dim">
                  <span>DIRECT_ENDPOINT</span>
                  <div className="flex items-center gap-1.5 text-theme-fg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0000ee] opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0000ee]"></span>
                    </span>
                    <span className="font-semibold text-[10px]">ONLINE</span>
                  </div>
                </div>
                <div className="mt-2 text-sm sm:text-base font-medium text-theme-fg break-all font-mono">
                  razzan.gianni@gmail.com
                </div>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => playHover()}
                  className="mt-4 flex w-full items-center justify-center gap-2 border border-theme bg-theme-fg py-2.5 font-mono text-xs uppercase tracking-wider text-theme-card transition-all hover:bg-theme-accent hover:border-theme-accent cursor-pointer"
                  style={{ borderRadius: "0px" }}
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL ADDRESS"}</span>
                </button>
              </div>
            </AnimateOnScroll>

            {/* Social Links */}
            <AnimateOnScroll direction="up" delay={400}>
              <div className="pt-1 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-theme-dim">CHANNELS:</div>
                <div className="mt-2 flex flex-wrap gap-4">
                  <a
                    href="https://github.com/YuZann81"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="flex items-center gap-1.5 text-theme-fg hover:text-theme-accent transition-colors"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>github.com/YuZann81</span>
                    <ExternalLink className="h-3 w-3 text-theme-dim" />
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Interactive Terminal Contact Form */}
          <div className="lg:col-span-7">
            <AnimateOnScroll direction="left" delay={250}>
              <div className="border border-theme bg-theme-card p-5 sm:p-8 shadow-sm" style={{ borderRadius: "0px" }}>
                <div className="flex items-center justify-between border-b border-theme pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-theme-fg">
                    <Terminal className="h-3.5 w-3.5 text-theme-fg" />
                    <span>TRANSMISSION_FORM.STATION</span>
                  </div>
                  <span className="text-theme-dim">SSL_ENCRYPTED</span>
                </div>

                {submitted ? (
                  <div className="my-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg sm:text-xl font-medium text-theme-fg">Transmission Received</h3>
                    <p className="mt-2 font-mono text-xs text-theme-muted">
                      Thank you. Your message has been logged. I will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 border border-theme bg-theme-card px-4 py-2 font-mono text-xs text-theme-fg hover:bg-theme-fg hover:text-theme-card transition-colors cursor-pointer"
                      style={{ borderRadius: "0px" }}
                    >
                      Send Another Transmission
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:space-y-5">
                    <div>
                      <label className="block font-mono text-xs uppercase text-theme-muted mb-1">
                        Identity / Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full border-b border-theme bg-transparent py-2 font-mono text-base sm:text-sm text-theme-fg placeholder:text-theme-dim outline-none transition-colors focus:border-theme-fg"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-theme-muted mb-1">
                        Return Address / Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full border-b border-theme bg-transparent py-2 font-mono text-base sm:text-sm text-theme-fg placeholder:text-theme-dim outline-none transition-colors focus:border-theme-fg"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-theme-muted mb-1">
                        Transmission Content / Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide project context, architecture scope, or timeline..."
                        className="w-full border-b border-theme bg-transparent py-2 font-mono text-base sm:text-sm text-theme-fg placeholder:text-theme-dim outline-none transition-colors focus:border-theme-fg resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onMouseEnter={() => playHover()}
                        className="flex w-full items-center justify-center gap-2 border border-theme bg-theme-fg py-3 font-mono text-xs uppercase tracking-wider text-theme-card transition-all hover:bg-theme-accent hover:border-theme-accent disabled:opacity-50 cursor-pointer"
                        style={{ borderRadius: "0px" }}
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>{isSubmitting ? "TRANSMITTING DATA..." : "TRANSMIT MESSAGE ↵"}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
