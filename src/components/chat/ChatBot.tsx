"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "안녕하세요! 다경의 포트폴리오에 오셨군요 😊 궁금한 것들을 물어보세요." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "오류가 발생했어요. 잠시 후 다시 시도해주세요.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 채팅창 */}
      <div
        className={`fixed bottom-24 right-6 z-[200] flex w-[320px] flex-col overflow-hidden border border-white/10 bg-[#111] shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 sm:right-8 sm:w-[360px] ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-white/60">Ask about Dakyung</p>
          <button onClick={() => setOpen(false)} className="text-white/30 transition-colors hover:text-white/70">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 메시지 목록 */}
        <div className="flex flex-col gap-3 overflow-y-auto p-4" style={{ height: 320 }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-white/10 text-white/80"
                    : "text-white/60"
                }`}
              >
                {msg.content}
                {loading && i === messages.length - 1 && msg.role === "assistant" && msg.content === "" && (
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* 입력창 */}
        <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="질문을 입력하세요..."
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/25 focus:outline-none disabled:opacity-40"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="text-white/30 transition-colors hover:text-white/70 disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8H2M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 플로팅 버튼 — 장미 */}
      <div className="fixed bottom-6 right-6 z-[200] sm:right-8">
        <button
          onClick={() => setOpen(!open)}
          aria-label="챗봇 열기"
          className="rose-btn relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-none text-3xl"
          style={{
            overflow: "visible",
            background: "#1a0a0a",
            boxShadow: open
              ? "0 0 0 2.5px #cc0000, 0 0 20px rgba(220,0,0,0.7), 0 0 50px rgba(200,0,0,0.4)"
              : "0 0 0 2.5px #8b0000, 0 0 18px rgba(180,0,0,0.55), 0 0 40px rgba(160,0,0,0.3)",
          }}
        >
          {open ? "✕" : "🌹"}

          {/* 반짝이 */}
          {!open && <>
            <span className="sparkle absolute h-1 w-1 rounded-full bg-white" style={{ top: 8, left: 12, "--dur": "1.8s", "--delay": "0s" } as React.CSSProperties} />
            <span className="sparkle absolute h-1 w-1 rounded-full bg-white" style={{ top: 6, right: 10, "--dur": "2.1s", "--delay": "0.4s" } as React.CSSProperties} />
            <span className="sparkle absolute h-1 w-1 rounded-full bg-white" style={{ bottom: 10, left: 8, "--dur": "1.6s", "--delay": "0.8s" } as React.CSSProperties} />
            <span className="sparkle absolute h-1 w-1 rounded-full bg-white" style={{ bottom: 8, right: 12, "--dur": "2.3s", "--delay": "0.2s" } as React.CSSProperties} />
          </>}

          {/* 하트 */}
          {!open && <>
            <span className="heart-particle absolute text-[10px]" style={{ top: -5, left: 5, "--dur": "2.5s", "--delay": "0s" } as React.CSSProperties}>🤍</span>
            <span className="heart-particle absolute text-[10px]" style={{ top: -5, right: 5, "--dur": "2.8s", "--delay": "1.2s" } as React.CSSProperties}>🤍</span>
          </>}
        </button>
      </div>
    </>
  );
}
