import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function AboutScrollContent() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 py-10 md:grid-cols-[1fr_420px] md:gap-16">
      <div className={`${bricolage.className} space-y-8 md:pl-4 lg:pl-8`}>
        <h2 className="max-w-[18ch] text-4xl leading-[1.2] font-medium tracking-[-0.02em] text-white md:text-6xl">
          Frontend Developer
        </h2>
        <p className="text-3xl font-normal tracking-[-0.01em] text-white/90 md:text-5xl">
          with UI/UX sensitivity
        </p>
      </div>

      <div data-about-image className="justify-self-start md:justify-self-end">
        <Image
          src="/images/main-dk.JPG"
          alt="Profile image"
          width={520}
          height={700}
          className="h-auto w-[360px] object-cover shadow-[0_16px_50px_rgba(0,0,0,0.35)] md:w-[520px]"
        />
      </div>
    </div>
  );
}
