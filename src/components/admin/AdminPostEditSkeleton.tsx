import SitePageShell from "@/components/layout/SitePageShell";

export default function AdminPostEditSkeleton() {
  return (
    <SitePageShell maxWidth="780">
      <div className="mb-10 flex items-center justify-end gap-6 border-b border-white/6 pb-6">
        <div className="h-8 w-16 animate-pulse bg-white/6" />
      </div>

      <div className="mb-10 h-7 w-32 animate-pulse rounded bg-white/10" />

      <div className="flex flex-col gap-6">
        <div className="h-11 w-full animate-pulse rounded bg-white/6" />
        <div className="h-64 w-full animate-pulse rounded bg-white/6" />
        <div className="h-11 w-full animate-pulse rounded bg-white/6" />
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 animate-pulse rounded bg-white/6" />
          <div className="h-3 w-20 animate-pulse rounded bg-white/6" />
        </div>
        <div className="mt-2 h-10 w-28 animate-pulse bg-white/6" />
      </div>
    </SitePageShell>
  );
}
