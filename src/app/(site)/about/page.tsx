"use client";

import { useRef } from "react";
import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500"],
});

/* ── 여기 내용을 수정하세요 ───────────────────────── */

const BIO = {
  name: "유다경",
  role: "Frontend Developer",
  philosophy: "UI/UX sensitivity",
  intro: `사용자가 느끼는 작은 디테일이 경험 전체를 바꾼다고 믿습니다.
코드를 짜는 것보다 왜 이렇게 짜야 하는지를 먼저 생각하는 개발자입니다.
디자인과 개발 사이 어딘가에 서서, 두 언어를 동시에 구사하려 합니다.`,
  image: "/image/about-dk.jpg",
};

const STACKS = [
  { category: "Language", items: ["TypeScript", "JavaScript"] },
  { category: "Framework", items: ["React", "Next.js"] },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Bootstrap", "CSS Modules", "Framer Motion"],
  },
  {
    category: "Tool",
    items: ["Git", "Jenkins", "Docker", "Vercel", "Supabase"],
  },
];

const CAREER = [
  {
    period: "2021.09 — 현재",
    type: "보안 솔루션 중소기업",
    role: "Frontend Developer",
    description: "프로젝트 관리 시스템 개발 및 유지보수",
  },
  {
    period: "2018.12 — 2021.08",
    type: "스타트업 & 프리랜서",
    role: "UI Developer",
    description: "퍼블리싱 및 인터랙션 구현",
  },
];

const AWARDS = [
  {
    year: "2026",
    title: "Zombie Zero Inspector XDR ",
    description: "국가정보원 보안기능 확인서 획득",
  },
  {
    year: "2026",
    title: "SaaS Cloud - Ransomware Zero Manager",
    description: "Naver Cloud, NHN Cloud 한국 , 일본 동시 서비스 출시",
  },
  {
    year: "2024",
    title: "Ransom Zero Manager",
    description:
      "과학기술정보통신부 주최 2024 클라우드 개발 지원 사업 성과 발표회 장관상 수상",
  },
];

/* ─────────────────────────────────────────────── */

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] px-6 pb-32 pt-36 md:px-12">
      <div className="mx-auto max-w-[780px] flex flex-col gap-28">
        {/* Hero */}
        <section className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-white/30">
                {BIO.role}
              </p>
              <h1
                className={`${bricolage.className} text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white/90`}
              >
                {BIO.name}
              </h1>
              <p
                className={`${bricolage.className} mt-2 text-[clamp(1.25rem,2.5vw,1.75rem)] font-normal text-white/40`}
              >
                with {BIO.philosophy}
              </p>
            </div>
            <p className="whitespace-pre-line text-sm leading-[1.9] text-white/55">
              {BIO.intro}
            </p>
          </div>

          <div className="shrink-0">
            <Image
              src={BIO.image}
              alt={BIO.name}
              width={220}
              height={280}
              className="h-[260px] w-[200px] object-cover shadow-[0_16px_50px_rgba(0,0,0,0.4)] md:h-[300px] md:w-[220px]"
            />
          </div>
        </section>

        {/* 기술 스택 */}
        <Section>
          <h2
            className={`${bricolage.className} mb-8 text-xs uppercase tracking-[0.15em] text-white/30`}
          >
            Stack
          </h2>
          <div className="flex flex-col gap-5">
            {STACKS.map((group) => (
              <div key={group.category} className="flex items-baseline gap-6">
                <span className="w-24 shrink-0 text-[11px] uppercase tracking-[0.1em] text-white/25">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border border-white/10 px-3 py-1 text-xs text-white/55"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 경력 */}
        <Section>
          <h2
            className={`${bricolage.className} mb-8 text-xs uppercase tracking-[0.15em] text-white/30`}
          >
            Career
          </h2>
          <ul className="flex flex-col divide-y divide-white/[0.06]">
            {CAREER.map((item, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 py-6 md:flex-row md:gap-10"
              >
                <span className="w-40 shrink-0 text-[11px] uppercase tracking-[0.08em] text-white/25">
                  {item.period}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`${bricolage.className} text-base font-medium text-white/80`}
                    >
                      {item.type}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.08em] text-white/35">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-sm text-white/40">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* 수상 / 프로젝트 */}
        <Section>
          <h2
            className={`${bricolage.className} mb-8 text-xs uppercase tracking-[0.15em] text-white/30`}
          >
            Awards & Projects
          </h2>
          <ul className="flex flex-col divide-y divide-white/[0.06]">
            {AWARDS.map((item, i) => (
              <li key={i} className="flex items-baseline gap-10 py-5">
                <span className="w-10 shrink-0 text-[11px] tabular-nums text-white/25">
                  {item.year}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-white/75">{item.title}</span>
                  <span className="text-xs text-white/35">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
