import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400"],
});

export function CornerWord({
  pre = '',
  letter,
  post = '',
}: {
  pre?: string
  letter: string
  post?: string
}) {
  return (
    <span className={`${bricolage.className} select-none`}>
      <span className="text-white/[0.28] text-[14px] font-light tracking-[0.1em]">{pre}</span>
      <span className="text-white/85 text-[16px] font-semibold tracking-[0.1em]">{letter}</span>
      <span className="text-white/[0.28] text-[14px] font-light tracking-[0.1em]">{post}</span>
    </span>
  )
}
