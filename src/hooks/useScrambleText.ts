"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function useScrambleText(originalText: string, speed = 25) {
  const [displayText, setDisplayText] = useState(originalText);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const trigger = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayText(originalText);
      }

      iteration += 1 / 3;
    }, speed);
  }, [originalText, speed, isScrambling]);

  return { displayText, trigger, isScrambling };
}
