"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterLineProps = {
  text: string;
  className?: string;
  /** ms per character */
  speed?: number;
  onComplete?: () => void;
  onReset?: () => void;
};

export function TypewriterLine({
  text,
  className = "",
  speed = 58,
  onComplete,
  onReset,
}: TypewriterLineProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chars = Array.from(text);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    clearTimer();
    setCount(0);
    setDone(false);
    setActive(false);
    onReset?.();
  };

  const start = () => {
    clearTimer();
    setCount(0);
    setDone(false);
    setActive(true);

    let i = 0;
    timerRef.current = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= chars.length) {
        clearTimer();
        setDone(true);
        onComplete?.();
      }
    }, speed);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else reset();
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- text change resets via remount
  }, [text, speed]);

  const visible = chars.slice(0, count).join("");

  return (
    <p ref={rootRef} className={`text-center ${className}`.trim()}>
      <span className="relative inline-block whitespace-nowrap">
        <span className="invisible select-none whitespace-nowrap" aria-hidden="true">
          {text}
        </span>
        <span
          className="absolute left-0 top-0 whitespace-nowrap"
          aria-live="polite"
        >
          {active ? visible : null}
          {active && (
            <span
              aria-hidden
              className={
                done
                  ? "typewriter-cursor"
                  : "inline-block w-[0.55ch] text-center text-white/70"
              }
            >
              |
            </span>
          )}
        </span>
      </span>
    </p>
  );
}
