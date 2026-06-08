"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = { maxCount: 5, windowMs: 60 * 60 * 1000 }; // 1시간에 5회

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot 검사 — 봇이 채우는 숨겨진 필드
  if (formData.get("_hp")) {
    return { status: "success" }; // 봇에게 성공처럼 보이게 조용히 무시
  }

  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const phone = (formData.get("phone") as string).trim();
  const message = (formData.get("message") as string).trim();

  if (!name || !email || !message) {
    return { status: "error", message: "필수 항목을 모두 입력해주세요." };
  }

  // IP 추출
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0].trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  // Rate limit 검사
  const windowStart = new Date(Date.now() - RATE_LIMIT.windowMs);
  const recentCount = await prisma.inquiry.count({
    where: { ip, createdAt: { gte: windowStart } },
  });

  if (recentCount >= RATE_LIMIT.maxCount) {
    return {
      status: "error",
      message: "너무 많은 요청이 발생했어요. 잠시 후 다시 시도해주세요.",
    };
  }

  try {
    await prisma.inquiry.create({
      data: { name, email, phone: phone || null, message, ip },
    });

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "XYDK Contact <onboarding@resend.dev>",
        to: "itagmi88@gmail.com",
        subject: `[XYDK] 새 문의 — ${name}`,
        html: `
          <p><strong>이름/회사명:</strong> ${name}</p>
          <p><strong>이메일:</strong> ${email}</p>
          ${phone ? `<p><strong>연락처:</strong> ${phone}</p>` : ""}
          <hr />
          <p><strong>문의 내용:</strong></p>
          <p style="white-space:pre-wrap">${message}</p>
        `,
      });
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: "전송 중 오류가 발생했어요. 잠시 후 다시 시도해주세요." };
  }
}
