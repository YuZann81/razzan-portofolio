"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }

    return () => {
      if (currentDom) observer.unobserve(currentDom);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100";
    switch (direction) {
      case "up":
        return "translate-y-8 opacity-0";
      case "down":
        return "-translate-y-8 opacity-0";
      case "left":
        return "translate-x-8 opacity-0";
      case "right":
        return "-translate-x-8 opacity-0";
      case "fade":
      default:
        return "opacity-0";
    }
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}
