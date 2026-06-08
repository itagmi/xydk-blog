import SitePageShell from "@/components/layout/SitePageShell";
import PostListSkeleton from "@/components/ui/PostListSkeleton";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500"] });

export default function Loading() {
  return (
    <SitePageShell>
      <h1 className={`${bricolage.className} mb-10 text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] text-white/90`}>
        UI/UX Thought
      </h1>
      <PostListSkeleton />
    </SitePageShell>
  );
}
