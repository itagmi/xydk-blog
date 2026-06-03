import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ITEMS = [
  {
    key: "books",
    label: "책 읽기",
    icon: "📚",
    iconWrapperClassName:
      "rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-5xl",
    headline: "BOOKS THAT SOMEHOW ALWAYS FIND ME AT THE RIGHT TIME",
    subtitle: "왠지 항상 딱 맞는 타이밍에 읽게 되는 책들",
  },
  {
    key: "photos",
    label: "사진 찍고 인스타 올리기",
    icon: "📷",
    iconWrapperClassName:
      "rounded-full border border-white/15 bg-white/[0.06] px-6 py-4 text-4xl",
    headline: "CHASING LIGHT AND MOMENTS WORTH KEEPING",
    subtitle: "간직할 만한 빛과 순간들을 쫓는 것",
  },
  {
    key: "reviews",
    label: "리뷰 인스타",
    icon: "✍️",
    iconWrapperClassName:
      "rotate-2 rounded-md border border-white/20 bg-white/10 px-4 py-6 text-4xl shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
    headline: "SAYING WHAT I THINK SO YOU DON'T HAVE TO GUESS",
    subtitle: "내가 솔직하게 말해줄 테니 당신은 고민 안 해도 됨",
  },
] as const;

export default function SideHustlesSection() {
  return (
    <div className="flex w-full max-w-[1200px] flex-col gap-16 md:gap-20">
      <header className="w-full">
        <h2
          className={`${bricolage.className} text-right text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white/90`}
        >
          the side hustles
        </h2>
      </header>

      <div
        id="side-hustles"
        className="flex w-full flex-col items-center gap-14 text-center"
      >
        <ul className="flex w-full flex-col items-center gap-14 md:flex-row md:items-start md:justify-center md:gap-10 lg:gap-12">
          {ITEMS.map((item) => (
            <li
              key={item.key}
              className="w-full max-w-[34ch] md:w-[34ch] md:shrink-0"
            >
              <article className="flex flex-col items-center gap-5">
                <p className="text-sm text-white/40">{item.label}</p>
                <div
                  className={`inline-flex w-fit ${item.iconWrapperClassName}`}
                >
                  {item.icon}
                </div>
                <p className="text-base leading-relaxed uppercase tracking-[0.06em] text-white/55 md:text-[15px]">
                  {item.headline}
                </p>
                <p className="text-sm leading-relaxed text-white/35">
                  {item.subtitle}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <p className="max-w-[42ch] text-sm leading-relaxed uppercase tracking-[0.06em] text-white/35 md:text-base">
          technically not side hustles, but they do take up side-hustle amounts
          of brain space.
        </p>
      </div>
    </div>
  );
}
