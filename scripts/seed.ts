import "dotenv/config";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { requireAsciiEnv } from "./env";

const openai = new OpenAI({ apiKey: requireAsciiEnv("OPENAI_API_KEY") });

const supabase = createClient(
  requireAsciiEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireAsciiEnv("SUPABASE_SERVICE_ROLE_KEY"),
);

// ── 내 포트폴리오 정보 ──────────────────────────────
const DOCUMENTS = [
  // 기본 소개
  `이름: 유다경
직책: Frontend Developer
철학: UI/UX sensitivity
소개: 사용자가 느끼는 작은 디테일이 경험 전체를 바꾼다고 믿습니다. 코드를 짜는 것보다 왜 이렇게 짜야 하는지를 먼저 생각하는 개발자입니다. 디자인과 개발 사이 어딘가에 서서, 두 언어를 동시에 구사하려 합니다.
거주지 및 위치 정보:
사는 곳: 인천 서구 청라동
거주 지역: 인천
위치: 인천 청라
`,

  // 기술 스택
  `기술 스택:
- 언어: TypeScript, JavaScript
- 프레임워크: React, Next.js
- 스타일링: Tailwind CSS, Bootstrap, CSS Modules, Framer Motion
- 도구: Git, Jenkins, Docker, Vercel, Supabase`,

  // 경력
  `경력 및 직무 경험:
유다경의 경력은 총 약 7년입니다.

1. 2021년 9월 ~ 현재 (약 4년) | 보안 솔루션 중소기업 | Frontend Developer
   - React, TypeScript 기반 프로젝트 관리 시스템 개발 및 유지보수
   - Jenkins CI/CD 파이프라인 운영
   - RESTful API 연동 및 상태 관리
   - 보안 솔루션 Admin UI 개발

2. 2018년 12월 ~ 2021년 8월 (약 2년 8개월) | 스타트업 & 프리랜서 | UI Developer
   - HTML/CSS 퍼블리싱 및 인터랙션 구현
   - 다양한 클라이언트 프로젝트 경험

현재 이직을 준비 중입니다.`,

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

  // 자기소개 & 강점
  `자기소개 및 강점:
- 패션을 전공하고 개발자로 전향한 독특한 배경
- 디자인 감각과 개발 능력을 동시에 보유
- 마감 기한을 철저히 지키는 신뢰성
- 직관적인 UI와 안정적인 비즈니스 로직 사이의 균형을 중시
- 왜 만드는지를 먼저 생각하는 개발 철학`,

  // 협업 스타일
  `협업 및 업무 스타일:
- QA 팀과 긴밀하게 협업하는 경험 보유
- 백엔드 개발자와 RESTful API 설계 협의 경험
- 직접적이고 솔직한 커뮤니케이션 스타일
- 피그마로 컨셉 설계 후 개발로 이어지는 워크플로우`,

  // 이직 관련
  `이직 관련:
현재 이직을 준비 중입니다.
새로운 도전과 성장 가능한 환경을 찾고 있습니다.
협업 제안이나 채용 문의는 Contact 페이지를 통해 주세요.`,

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

  // 사용 가능한 언어/도구 상세
  `개발 환경 및 도구:
- 에디터: Cursor, VS Code
- 협업: Notion, Figma, Slack
- 버전관리: Git, GitHub
- 배포: Vercel, Jenkins CI/CD
- OS: macOS`,

  // 자주 물어볼 질문 & 답변 직접 넣기
  `자주 묻는 질문:
Q: 연봉은 얼마를 원하세요?
A: 협의 가능합니다. Contact 페이지로 문의 주세요 😉.

Q: 재택근무 가능한가요?
A: 재택 및 하이브리드 근무 환경을 선호합니다.

Q: 언제부터 출근 가능한가요?
A: 협의 후 조율 가능합니다.
`,
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
  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .neq("id", 0);
  if (deleteError) console.warn("삭제 스킵:", deleteError.message);

  for (let i = 0; i < DOCUMENTS.length; i++) {
    const content = DOCUMENTS[i].trim();
    console.log(`[${i + 1}/${DOCUMENTS.length}] 벡터 변환 중...`);

    const embedding = await embed(content);

    const { error } = await supabase
      .from("documents")
      .insert({ content, embedding });
    if (error) {
      console.error(`❌ 저장 실패:`, error.message);
    } else {
      console.log(`✅ 저장 완료`);
    }
  }

  console.log("\n🎉 모든 문서 저장 완료!");
}

main().catch(console.error);
