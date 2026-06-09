"use client";

import { useState, useRef, useEffect } from "react";
import RoseChatButton from "@/components/chat/RoseChatButton";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요! 다경의 포트폴리오에 오신걸 환영해요. 😊\n궁금한 것들을 물어보세요. 🌹",
    },
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
        className={`fixed left-3 right-3 z-[200] flex w-auto flex-col overflow-hidden border border-white/10 bg-[#111] shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 sm:left-auto sm:right-8 sm:w-[360px] ${
          open ? "bottom-6 sm:bottom-24" : "bottom-24"
        } ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
          <p className="text-xs uppercase tracking-[0.12em] text-white/60">
            Ask about Dakyung
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="챗봇 닫기"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-white/30 transition-colors hover:text-white/70"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* 메시지 목록 */}
        <div
          className="flex flex-col gap-2.5 overflow-y-auto p-3 sm:gap-3"
          style={{ height: 320 }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`whitespace-pre-line py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "max-w-[88%] bg-white/10 px-3 text-white/80 sm:max-w-[94%]"
                    : "w-full text-white/60"
                }`}
              >
                {msg.content}
                {loading &&
                  i === messages.length - 1 &&
                  msg.role === "assistant" &&
                  msg.content === "" && (
                    <span className="inline-flex gap-1">
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      >
                        ·
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      >
                        ·
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      >
                        ·
                      </span>
                    </span>
                  )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* 입력창 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
          className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5 sm:py-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            disabled={loading}
            enterKeyHint="send"
            className="min-h-11 flex-1 bg-transparent text-base text-white/70 placeholder:text-white/25 focus:outline-none disabled:opacity-40 sm:text-sm"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="전송"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors active:bg-white/15 hover:text-white/80 disabled:opacity-30 sm:h-9 sm:w-9 sm:rounded-none sm:bg-transparent"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="sm:h-4 sm:w-4">
              <path
                d="M14 8H2M14 8L9 3M14 8L9 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* 플로팅 버튼 — 장미 (모바일에서 채팅 열림 시 숨김, 헤더 X로 닫기) */}
      <div
        className={`fixed bottom-6 right-6 z-[200] transition-opacity duration-300 sm:right-8 ${
          open ? "max-sm:pointer-events-none max-sm:opacity-0" : ""
        }`}
      >
        <RoseChatButton open={open} onClick={() => setOpen(!open)} />
      </div>
    </>
  );
}
