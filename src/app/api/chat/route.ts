import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message?.trim()) {
    return Response.json({ error: "메시지를 입력해주세요." }, { status: 400 });
  }

  // 1. 질문을 벡터로 변환
  const embeddingRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: message,
  });
  const queryEmbedding = embeddingRes.data[0].embedding;

  // 2. Supabase에서 유사한 문서 검색
  const { data: docs } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: 0.1,
    match_count: 5,
  });

  const context =
    docs?.map((d: { content: string }) => d.content).join("\n\n") ?? "";

  // 3. GPT로 답변 스트리밍
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `당신은 유다경의 포트폴리오 챗봇입니다.
방문자가 유다경에 대해 궁금한 것을 물어보면 아래 정보를 바탕으로 친근하게 답변하세요.
정보가 부족할 경우 있는 정보 내에서 최대한 답변하고, 정말 없는 경우에만 Contact 페이지로 안내하세요.
답변은 2~4문장, 한국어로 해주세요.

--- 포트폴리오 정보 ---
${context}`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  // 4. 스트림 응답 반환
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
