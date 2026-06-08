"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import SitePageShell from "@/components/layout/SitePageShell";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500"] });

const inputClass =
  "w-full border-b border-white/15 bg-transparent py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-white/40 focus:outline-none transition-colors";

const LIMITS = { name: 50, message: 500 };

const initial: ContactState = { status: "idle" };

export default function ContactPage() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state.status !== "success") return;

    formRef.current?.reset();
    setName("");
    setPhone("");
    setMessage("");

    const el = toastRef.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";

    const timer = setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
    }, 3500);

    return () => clearTimeout(timer);
  }, [state.status]);

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(digits);
  }

  return (
    <SitePageShell maxWidth="680">
      <div
        ref={toastRef}
        style={{
          opacity: 0,
          transform: "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
        className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 border border-white/15 bg-[#1a1a1a] px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <p className="text-sm text-white/80">메시지를 받았어요.</p>
        <p className="mt-0.5 text-xs text-white/40">곧 답변드릴게요.</p>
      </div>

      <h1
        className={`${bricolage.className} mb-3 text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] text-white/90`}
      >
        Contact
      </h1>
      <p className="mb-16 text-sm text-white/35">
        협업 제안, 질문, 그 외 무엇이든 편하게 보내주세요.
      </p>

      <form ref={formRef} action={action} className="flex flex-col gap-8">
        {/* Honeypot — 봇 방지용 숨겨진 필드 (사람 눈에 안 보임) */}
        <input type="text" name="_hp" tabIndex={-1} aria-hidden className="sr-only" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 이름/회사명 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase tracking-[0.1em] text-white/30">
                이름 / 회사명 <span className="text-white/20">*</span>
              </label>
              <span className={`text-[11px] tabular-nums ${name.length >= LIMITS.name ? "text-red-400/70" : "text-white/20"}`}>
                {name.length}/{LIMITS.name}
              </span>
            </div>
            <input
              name="name"
              type="text"
              required
              maxLength={LIMITS.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동 / XYDK"
              className={inputClass}
            />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-[0.1em] text-white/30">
              이메일 <span className="text-white/20">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              maxLength={100}
              placeholder="hello@example.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* 연락처 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] uppercase tracking-[0.1em] text-white/30">
              연락처
            </label>
            <span className="text-[11px] tabular-nums text-white/20">
              {phone.length}/11
            </span>
          </div>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={handlePhone}
            placeholder="01000000000"
            className={inputClass}
          />
        </div>

        {/* 문의 내용 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] uppercase tracking-[0.1em] text-white/30">
              문의 내용 <span className="text-white/20">*</span>
            </label>
            <span className={`text-[11px] tabular-nums ${message.length >= LIMITS.message ? "text-red-400/70" : "text-white/20"}`}>
              {message.length}/{LIMITS.message}
            </span>
          </div>
          <textarea
            name="message"
            required
            rows={6}
            maxLength={LIMITS.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="전달하고 싶은 내용을 자유롭게 적어주세요."
            className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-sm leading-relaxed text-white/80 placeholder:text-white/25 focus:border-white/40 focus:outline-none transition-colors"
          />
        </div>

        {state.status === "error" && (
          <p className="text-xs text-red-400/80">{state.message}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.12em] text-white/60 transition-colors hover:border-white/40 hover:text-white/90 disabled:opacity-40"
          >
            {pending ? "전송 중..." : "Send"}
          </button>
        </div>
      </form>
    </SitePageShell>
  );
}
