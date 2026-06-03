import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function ContactSection() {
  return (
    <div
      id="contact"
      className="flex w-full flex-col items-center gap-8 text-center"
    >
      <h2
        className={`${bricolage.className} text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white/90`}
      >
        Contact me
      </h2>

      <p className="max-w-[36ch] text-base leading-relaxed text-white/55 md:text-lg">
        프로젝트·협업·질문이 있으면 편하게 연락 주세요.
      </p>

      <Link
        href="/contact"
        className="text-[11px] font-normal uppercase tracking-[0.12em] text-white/40 no-underline transition-colors duration-[250ms] hover:text-white/85"
      >
        Go to contact page
      </Link>
    </div>
  );
}
