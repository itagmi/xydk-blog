import { Bricolage_Grotesque } from "next/font/google";
import SitePageShell from "@/components/layout/SitePageShell";
import PhotoWall from "@/components/life/PhotoWall";
import { LIFE_PHOTOS } from "@/config/life";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "500"] });

export default function LifePage() {
  return (
    <SitePageShell maxWidth="900">
      <h1
        className={`${bricolage.className} mb-3 text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] text-white/90`}
      >
        Life
      </h1>
      <p className="mb-16 text-sm text-white/35">
        일상의 조각들.
      </p>

      <PhotoWall photos={LIFE_PHOTOS} />
    </SitePageShell>
  );
}
