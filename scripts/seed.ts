import "dotenv/config";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── 내 포트폴리오 정보 ──────────────────────────────
const DOCUMENTS = [
  // 기본 소개
  `이름: 유다경
직책: Frontend Developer
철학: UI/UX sensitivity
소개: 사용자가 느끼는 작은 디테일이 경험 전체를 바꾼다고 믿습니다. 코드를 짜는 것보다 왜 이렇게 짜야 하는지를 먼저 생각하는 개발자입니다. 디자인과 개발 사이 어딘가에 서서, 두 언어를 동시에 구사하려 합니다.`,

  // 기술 스택
  `기술 스택:
- 언어: TypeScript, JavaScript
- 프레임워크: React, Next.js
- 스타일링: Tailwind CSS, Bootstrap, CSS Modules, Framer Motion
- 도구: Git, Jenkins, Docker, Vercel, Supabase`,

  // 경력
  `경력:
1. 2021.09 ~ 현재 | 보안 솔루션 중소기업 | Frontend Developer
   - 프로젝트 관리 시스템 개발 및 유지보수

2. 2018.12 ~ 2021.08 | 스타트업 & 프리랜서 | UI Developer
   - 퍼블리싱 및 인터랙션 구현`,

  // 수상 및 주요 프로젝트
  `수상 및 주요 프로젝트:
1. 2026 | Zombie Zero Inspector XDR
   - 국가정보원 보안기능 확인서 획득

2. 2026 | SaaS Cloud - Ransomware Zero Manager
   - Naver Cloud, NHN Cloud 한국·일본 동시 서비스 출시

3. 2024 | Ransom Zero Manager
   - 과학기술정보통신부 주최 2024 클라우드 개발 지원 사업 성과 발표회 장관상 수상`,

  // 사이드 프로젝트 / 관심사
  `관심사 및 사이드 활동:
- 책 읽기: 왠지 항상 딱 맞는 타이밍에 읽게 되는 책들을 좋아함
- 사진 & 인스타그램: 빛과 순간을 포착하는 걸 즐김 (@xyoodakyung)
- 리뷰 인스타: 솔직한 리뷰를 공유 (@ttomatto.zip)`,

  // 포트폴리오 사이트 소개
  `포트폴리오 사이트 XYDK:
- XYDK는 eXperience, Yourself, Developer, Kinetics의 앞글자
- Next.js 16, TypeScript, Tailwind CSS, Supabase, Prisma로 제작
- Dev Notes, UI/UX Thought 게시판 운영 중
- 피그마로 컨셉 잡고 직접 개발, 약 3~4일 소요`,

  // 연락처
  `연락처:
- 포트폴리오: xydk-blog.vercel.app
- 문의: 사이트 Contact 페이지를 통해 가능
- 협업 제안, 커피챗 등 언제든 환영`,
];
// ────────────────────────────────────────────────

async function embed(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
}

async function main() {
  console.log(`총 ${DOCUMENTS.length}개 문서 처리 시작...`);

  // 기존 데이터 삭제 (재실행 시 중복 방지)
  const { error: deleteError } = await supabase.from("documents").delete().neq("id", 0);
  if (deleteError) console.warn("삭제 스킵:", deleteError.message);

  for (let i = 0; i < DOCUMENTS.length; i++) {
    const content = DOCUMENTS[i].trim();
    console.log(`[${i + 1}/${DOCUMENTS.length}] 벡터 변환 중...`);

    const embedding = await embed(content);

    const { error } = await supabase.from("documents").insert({ content, embedding });
    if (error) {
      console.error(`❌ 저장 실패:`, error.message);
    } else {
      console.log(`✅ 저장 완료`);
    }
  }

  console.log("\n🎉 모든 문서 저장 완료!");
}

main().catch(console.error);
