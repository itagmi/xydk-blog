import SitePageShell from "@/components/layout/SitePageShell";

export default function AdminPostViewSkeleton() {
  return (
    <SitePageShell maxWidth="780">
      <div className="mb-10 flex items-center justify-end gap-6 border-b border-white/6 pb-6">
        <div className="h-8 w-20 animate-pulse bg-white/6" />
        <div className="h-8 w-14 animate-pulse bg-white/6" />
        <div className="h-8 w-14 animate-pulse bg-white/6" />
      </div>

      <div className="mb-10 h-7 w-2/3 max-w-md animate-pulse rounded bg-white/10" />

      <div className="mb-10 flex flex-wrap gap-4 border-b border-white/6 pb-6">
        <div className="h-3 w-10 animate-pulse rounded bg-white/6" />
        <div className="h-3 w-24 animate-pulse rounded bg-white/6" />
        <div className="h-3 w-16 animate-pulse rounded bg-white/6" />
        <div className="h-3 w-14 animate-pulse rounded bg-white/6" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-white/6"
            style={{ width: `${88 - (i % 4) * 12}%` }}
          />
        ))}
      </div>
    </SitePageShell>
  );
}
