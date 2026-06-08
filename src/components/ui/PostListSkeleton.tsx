export default function PostListSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-white/[0.06]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-5">
          <div className="flex flex-col gap-2 flex-1">
            <div
              className="h-3.5 rounded-sm bg-white/[0.06] animate-pulse"
              style={{ width: `${55 + (i % 3) * 15}%` }}
            />
            <div className="h-2.5 w-20 rounded-sm bg-white/[0.04] animate-pulse" />
          </div>
          <div className="h-2.5 w-16 rounded-sm bg-white/[0.04] animate-pulse" />
        </div>
      ))}
    </div>
  );
}
