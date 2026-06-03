# XYDK UI Rules

포트폴리오 메인 사이트의 시각·레이아웃·컴포넌트 사용 규칙입니다.  
새 섹션이나 페이지를 추가할 때 이 문서를 기준으로 맞춥니다.

> **현재 단계**: 문서만 정의. 색·간격은 Tailwind 클래스로 직접 사용 중이며, 추후 `tokens.css` 등으로 코드화할 수 있습니다.

---

## 1. 디자인 방향

- **무드**: 다크, 미니멀, 여백 넉넉, 타이포 중심
- **배경**: 단색 블랙에 가까운 `#0c0c0c` (그라데이션·강한 컬러 배경 지양)
- **대비**: 흰색 계열 opacity 단계로 위계 표현 (진한 흰색 → 연한 회색)
- **인터랙션**: 과한 UI 장식보다 hover opacity·가벼운 scale·스크롤 페이드

---

## 2. 컬러 (Color Tokens)

| 역할            | 값           | Tailwind 예시                    | 용도                               |
| --------------- | ------------ | -------------------------------- | ---------------------------------- |
| Surface         | `#0c0c0c`    | `bg-[#0c0c0c]`                   | 페이지·섹션 배경                   |
| Text primary    | white 90%    | `text-white/90`                  | 섹션 제목, 강조 문구               |
| Text secondary  | white 55%    | `text-white/55`                  | 본문, 카드 설명                    |
| Text muted      | white 35–40% | `text-white/35`, `text-white/40` | 캡션, 네비 비활성                  |
| Text accent     | white 85%    | `text-white/85`                  | 네비 활성, 코너 강조 글자(X/Y/D/K) |
| Border default  | white 15%    | `border-white/15`                | 카드·아이콘 박스                   |
| Border emphasis | white 20%    | `border-white/20`                | 강조 카드(폴라로이드 등)           |
| Surface subtle  | white 6%     | `bg-white/[0.06]`                | 아이콘/카드 배경                   |
| Surface raised  | white 10%    | `bg-white/10`                    | 살짝 떠 있는 요소                  |

**금지·주의**

- 핑크/비비드 단색 전체 배경 (레퍼런스 캡처용이었음 → 프로덕션은 다크 톤 유지)
- 본문에 `text-white` 100% 남발 (제목만 밝고 나머지는 단계적으로)

---

## 3. 타이포그래피 (Typography)

### 폰트 역할

| 역할           | 폰트                    | 로드 위치               | 사용처                                        |
| -------------- | ----------------------- | ----------------------- | --------------------------------------------- |
| UI / 네비      | **Geist** (기본)        | `layout.tsx`            | `SiteNav`, 기본 body                          |
| Display / 섹션 | **Bricolage Grotesque** | 각 섹션·히어로 컴포넌트 | 히어로 타이틀, About, Side hustles, 코너 워드 |

네비게이션은 **Bricolage를 쓰지 않는다** (Geist + uppercase + letter-spacing 유지).

### 타입 스케일

| 레벨             | 크기                                  | weight           | tracking            | 예시                   |
| ---------------- | ------------------------------------- | ---------------- | ------------------- | ---------------------- |
| Display (히어로) | `clamp(48px, 5.5vw, 80px)`            | medium (500)     | `-0.01em`           | What is XYDK?          |
| Section title    | `text-4xl` → `md:text-6xl` 또는 clamp | medium           | `-0.02em`           | Frontend Developer     |
| Section subtitle | `text-3xl` → `md:text-5xl`            | normal           | `-0.01em`           | with UI/UX sensitivity |
| Nav link         | `11px`                                | normal           | `0.12em`            | ABOUT, DEV NOTES       |
| Card copy        | `text-base` → `md:text-lg`            | normal           | `0.06em`, uppercase | Side hustles 설명      |
| Caption          | `text-sm` → `md:text-base`            | normal           | `0.06em`, uppercase | 하단 각주 문구         |
| Corner word      | 14px / 16px                           | light / semibold | `0.1em`             | experience, X 강조     |

### 줄 길이 (measure)

- 제목: `max-w-[12ch]` ~ `max-w-[18ch]`
- 카드 본문: `max-w-[22ch]` 전후
- 각주: `max-w-[42ch]`

---

## 4. 레이아웃 & 간격

### 페이지 구조 (메인)

1. **Hero** — `min-h-screen`, 풀스크린 인트로
2. **About** — `ScrollSection` + 2열(텍스트 | 이미지)
3. **Side hustles** — `ScrollSection` + 중앙 정렬 3열

### 섹션 공통

- 최소 높이: `min-h-screen`
- 배경: `bg-[#0c0c0c]`
- 콘텐츠 최대 너비: `max-w-[1000px]` ~ `max-w-[1200px]` (섹션별)

### 패딩 규칙 (2·3번 섹션 공통)

레이어를 나눠 **한 곳에서만** 가로 여백을 준다.

| 레이어                        | 담당                                          | Tailwind                                      |
| ----------------------------- | --------------------------------------------- | --------------------------------------------- |
| **Section shell**             | `ScrollSection` — 화면 가장자리 inset         | `px-6 md:px-10 lg:px-12`                      |
| **Inner container**           | 각 섹션 콘텐츠 — 최대 너비·중앙               | `mx-auto w-full max-w-[1200px]` (또는 1000px) |
| **Inner container**           | 가로 `px-*` **넣지 않음** (shell과 중복 방지) | —                                             |
| **Split 텍스트 열** (About만) | 왼쪽 정렬 텍스트 추가 숨                      | `md:pl-4 lg:pl-8`                             |

- 3번(Side hustles): 중앙 정렬이라 split padding 없음. shell 패딩만으로 충분.
- 2번(About): 사진 위치는 유지, **텍스트 열**에만 `md:pl-4 lg:pl-8`로 왼쪽 숨 확보.
- 섹션마다 `px-2` / `px-8` 같이 제각각 쓰지 않는다.

### 고정 네비게이션 safe area

- 네비: `fixed top-10`, `z-[100]`
- 섹션 상단 콘텐츠는 네비와 겹치지 않게 **`pt-16` 이상** (권장 `pt-20` ~ `pt-36`)
- 타이틀을 화면 최상단·네비 라인에 두지 않는다

### 그리드 / 정렬

- About: `md:grid-cols-[1fr_420px]`, 이미지 `md:justify-self-end`
- Side hustles: 모바일 세로 스택 → `md:flex-row` + `justify-center`, **항목은 `items-center` + `text-center`**
- 3개 카드 레이아웃에 `sm:grid-cols-2` 사용 시 **3번째 항목이 한 줄 왼쪽에 떨어지지 않도록** 주의 (현재는 flex 3열 권장)

### 브레이크포인트

- 기본: 모바일 퍼스트
- 주요 전환: `md:` (768px), 간격 확장: `lg:`

---

## 5. 컴포넌트 맵

| 컴포넌트             | 경로                                     | 책임                             |
| -------------------- | ---------------------------------------- | -------------------------------- |
| `SiteNav`            | `components/layout/SiteNav.tsx`          | 전역 고정 네비                   |
| `Hero`               | `components/hero/Hero.tsx`               | 1번 비주얼, 코너 링크            |
| `CornerWord`         | `components/hero/CornerWord.tsx`         | 코너 단어 스타일                 |
| `ScrollSection`      | `components/hero/ScrollSection.tsx`      | 풀스크린 섹션 래퍼 + 스크롤 fade |
| `AboutScrollContent` | `components/home/AboutScrollContent.tsx` | 2번 비주얼 콘텐츠                |
| `SideHustlesSection` | `components/home/SideHustlesSection.tsx` | 3번 비주얼 콘텐츠                |

**규칙**

- 새 풀스크린 섹션 → `ScrollSection`으로 감싼 뒤, 내부는 `components/home/*` 또는 `components/sections/*`에 콘텐츠만 분리
- 페이지(`app/page.tsx`)는 **조합만** 담당 (마크업·스타일 최소화)

---

## 6. 인터랙션 & 모션

### 링크

- 코너/텍스트 링크: `cursor-pointer`, hover `opacity-100` (기본 `opacity-75`)
- 네비: 색상 전환 `duration-[250ms]`, hover 시 `text-white/85`

### GSAP (ScrollSection)

| 대상                              | 효과                                | duration | ease           |
| --------------------------------- | ----------------------------------- | -------- | -------------- |
| 섹션 전체                         | opacity 0 → 1, y 48 → 0             | 0.9s     | power3.out     |
| About 이미지 (`data-about-image`) | blur 14px → 0, scale 1.06 → 1       | 1.1s     | power2.out     |
| 트리거                            | `start: top 80%` / 이미지 `top 75%` | —        | toggle reverse |

새 섹션에 이미지 디졸브가 필요하면 `data-about-image` 속성 패턴을 재사용한다.

### 히어로 (useHeroGsap)

- 마운트: 코너 stagger fade up → 타이틀 fade
- 스크롤: hero blur + opacity 감소 (scrub)

**원칙**: 한 섹션에 애니메이션 패턴은 1~2개까지만. 과한 pin·parallax 추가 전에 이 문서 업데이트.

---

## 7. 이미지

- 정적 파일: `public/image/` (예: `main-dk.JPG`)
- 사용: `next/image`, `object-cover`
- 그림자: `shadow-[0_16px_50px_rgba(0,0,0,0.35)]` (프로필 사진)
- alt 텍스트 필수

---

## 8. 접근성·마크업

- `<nav aria-label="Main">`
- 섹션 제목은 시맨틱 heading (`h1` 히어로 1개, 이후 `h2`)
- 장식용 이모지/아이콘은 의미 전달이 없으면 주변 텍스트로 맥락 제공
- 포커스 가능 링크는 hover뿐 아니라 `focus-visible` 스타일 고려

---

## 9. Do / Don't

### Do

- 색·타이포 위계는 opacity 단계로 통일
- 섹션마다 `min-h-screen` + 네비 safe area
- Bricolage는 **메인 비주얼·섹션 타이틀**에만
- 콘텐츠 수정은 해당 섹션 컴포넌트·`ITEMS` 배열에서

### Don't

- 섹션마다 새 배경색·새 폰트 도입
- `page.tsx`에 긴 인라인 Tailwind 블록 추가
- 고정 네비 높이 무시하고 `top-0`에 큰 제목 배치
- LAN IP dev 접속 시 `allowedDevOrigins` 누락 (Next.js 16)

---

## 10. 추후 코드화 (선택)

문서가 안정되면 아래 순서로 토큰 파일화를 권장합니다.

1. `src/styles/tokens.css` — CSS 변수 (`--color-surface`, `--text-muted` …)
2. Tailwind `@theme` 연동
3. `components/ui/SectionTitle.tsx`, `SectionCaption.tsx` 등 공통 타이포 컴포넌트

---

## 11. 변경 이력

| 날짜       | 내용                                            |
| ---------- | ----------------------------------------------- |
| 2026-06-02 | 초안 작성 (현재 메인 3섹션 기준)                |
| 2026-06-02 | 섹션 패딩 규칙 추가, About 텍스트 열 inset 반영 |
