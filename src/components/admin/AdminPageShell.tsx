import { Bricolage_Grotesque } from "next/font/google";
import SitePageShell from "@/components/layout/SitePageShell";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500"] });

type AdminPageShellProps = {
  title: string;
  maxWidth?: "780" | "900";
  titleSize?: "page" | "section";
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export default function AdminPageShell({
  title,
  maxWidth = "900",
  titleSize = "page",
  actions,
  children,
}: AdminPageShellProps) {
  const titleClassName =
    titleSize === "page"
      ? `${bricolage.className} mb-16 text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.02em] text-white/90`
      : `${bricolage.className} mb-10 text-xl font-medium text-white/60`;

  return (
    <SitePageShell maxWidth={maxWidth}>
      {actions ? (
        <div className="mb-10 flex items-center justify-end gap-6 border-b border-white/[0.06] pb-6">
          {actions}
        </div>
      ) : null}
      <h1 className={titleClassName}>{title}</h1>
      {children}
    </SitePageShell>
  );
}
