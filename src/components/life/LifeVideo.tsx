"use client";

import { useEffect, useRef, useState } from "react";

type LifeVideoProps = {
  src: string;
  poster?: string;
};

export default function LifeVideo({ src, poster }: LifeVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [src]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "240px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      setReady(true);
      return;
    }

    const markReady = () => setReady(true);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, [inView, src]);

  return (
    <div
      ref={containerRef}
      className="relative h-[220px] w-full overflow-hidden bg-[#ddd8d0] sm:h-[260px]"
    >
      <div
        className={`life-video-shimmer absolute inset-0 transition-opacity duration-700 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden
      />

      {poster && !ready && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      )}

      {inView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
