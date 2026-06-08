"use client";

import { useCallback, useRef } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";
import { TypewriterLine } from "@/components/ui/TypewriterLine";

gsap.registerPlugin(ScrollTrigger);

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const CONTACT_COPY = "프로젝트·협업·질문이 있으면 편하게 연락 주세요.";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const showCta = useCallback(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" },
    );
  }, []);

  const hideCta = useCallback(() => {
    if (!ctaRef.current) return;
    gsap.set(ctaRef.current, { opacity: 0, y: 20, scale: 0.96 });
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const trigger = sectionRef.current;
      const scrollOpts = {
        trigger,
        start: "top 72%",
        toggleActions: "play reverse play reverse",
      };

      gsap.from("[data-contact-word]", {
        scrollTrigger: scrollOpts,
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.14,
      });

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20, scale: 0.96 });
      }
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="flex w-full flex-col items-center gap-8 text-center"
    >
      <h2
        className={`${bricolage.className} text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white/90`}
      >
        <span data-contact-word className="inline-block">
          Contact
        </span>{" "}
        <span data-contact-word className="inline-block">
          me
        </span>
      </h2>

      <TypewriterLine
        text={CONTACT_COPY}
        className="text-sm leading-relaxed text-white/55 md:text-lg"
        onComplete={showCta}
        onReset={hideCta}
      />

      <ButtonLink
        ref={ctaRef}
        href="/contact"
        variant="primary"
        className="rounded-full opacity-0"
      >
        Go to contact page
      </ButtonLink>
    </div>
  );
}
