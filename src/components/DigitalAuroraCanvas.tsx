"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  hue: number;
}

export default function DigitalAuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let isTabActive = true;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 3;
    let targetMouseX = width / 2;
    let targetMouseY = height / 3;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = width < 768 ? 45 : 85;
      for (let i = 0; i < count; i++) {
        const isAccent = Math.random() < 0.25;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: -Math.random() * 0.5 - 0.15,
          radius: Math.random() * 2 + 0.8,
          alpha: Math.random() * 0.5 + 0.1,
          maxAlpha: Math.random() * 0.6 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          hue: isAccent ? 220 : 210,
        });
      }
    };

    initParticles();

    // IntersectionObserver to sleep when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isTabActive) {
            cancelAnimationFrame(animationFrameId);
            render();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isVisible && isTabActive) {
        cancelAnimationFrame(animationFrameId);
        render();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      if (!isVisible || !isTabActive) return;

      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";

      // 1. Draw Multi-Layered Luminous Aurora Wave Ribbons
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const baseOffsetY = height * (0.35 + w * 0.18);
        const waveSpeed = time * (0.8 + w * 0.3);
        const amplitude = 35 + w * 20;

        ctx.moveTo(0, baseOffsetY);

        for (let x = 0; x <= width; x += 15) {
          const mouseInfluence =
            Math.max(0, 1 - Math.abs(x - mouseX) / (width * 0.4)) * (mouseY - baseOffsetY) * 0.25;

          const y =
            baseOffsetY +
            Math.sin(x * 0.003 + waveSpeed) * amplitude +
            Math.cos(x * 0.006 - waveSpeed * 0.7) * (amplitude * 0.5) +
            mouseInfluence;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseOffsetY - amplitude, 0, height);
        if (isDark) {
          grad.addColorStop(0, `rgba(0, 102, 255, ${0.04 - w * 0.01})`);
          grad.addColorStop(0.5, `rgba(0, 170, 255, ${0.02 - w * 0.005})`);
          grad.addColorStop(1, "rgba(8, 8, 8, 0)");
        } else {
          grad.addColorStop(0, `rgba(0, 0, 238, ${0.03 - w * 0.008})`);
          grad.addColorStop(0.5, `rgba(0, 102, 255, ${0.015 - w * 0.005})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 2. Dynamic Radial Mouse Glow
      if (mouseX > 0 && mouseY > 0) {
        const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
        if (isDark) {
          mouseGlow.addColorStop(0, "rgba(0, 102, 255, 0.12)");
          mouseGlow.addColorStop(0.5, "rgba(0, 102, 255, 0.03)");
          mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          mouseGlow.addColorStop(0, "rgba(0, 0, 238, 0.08)");
          mouseGlow.addColorStop(0.5, "rgba(0, 0, 238, 0.02)");
          mouseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        }
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Floating Stardust Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.alpha += p.pulseSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(180, 210, 255, ${p.alpha})`;
          ctx.shadowColor = "#0066ff";
          ctx.shadowBlur = p.radius > 2 ? 6 : 0;
        } else {
          ctx.fillStyle = `rgba(0, 50, 180, ${p.alpha * 0.7})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90 transition-opacity" />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
