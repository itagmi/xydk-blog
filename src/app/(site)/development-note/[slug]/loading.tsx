import SitePageShell from "@/components/layout/SitePageShell";

export default function Loading() {
  return (
    <SitePageShell maxWidth="680">
      <div className="mb-12 h-3 w-16 animate-pulse rounded bg-white/10" />
      <div className="mb-12 space-y-4">
        <div className="h-8 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="h-8 w-1/2 animate-pulse rounded bg-white/10" />
        <div className="mt-4 flex gap-4">
          <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-3 w-12 animate-pulse rounded bg-white/[0.06]" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-white/[0.06]" style={{ width: `${85 - (i % 3) * 15}%` }} />
        ))}
      </div>
    </SitePageShell>
  );
}
