import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400"],
});

export function CornerWord({
  pre = "",
  letter,
  post = "",
  align = "left",
}: {
  pre?: string;
  letter: string;
  post?: string;
  align?: "left" | "right";
}) {
  const letterOrigin = align === "right" ? "origin-right" : "origin-left";

  return (
    <span className={`${bricolage.className} select-none`}>
      <span className="text-[14px] font-light tracking-[0.1em] text-white/[0.28] transition-[opacity,color] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-white/40 group-focus-visible:text-white/40">
        {pre}
      </span>
      <span
        className={`inline-block text-[16px] font-semibold tracking-[0.1em] text-white/85 transition-[transform,color,letter-spacing] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.38] group-hover:tracking-[0.14em] group-hover:text-white group-focus-visible:scale-[1.38] group-focus-visible:tracking-[0.14em] group-focus-visible:text-white ${letterOrigin}`}
      >
        {letter}
      </span>
      <span className="text-[14px] font-light tracking-[0.1em] text-white/[0.28] transition-[opacity,color] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-white/40 group-focus-visible:text-white/40">
        {post}
      </span>
    </span>
  );
}
