export default function AdminLoginLoading() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel skeleton */}
      <div className="nav-grid hidden flex-col justify-between border-r border-white/6 bg-navy p-10 lg:flex lg:w-[480px] lg:shrink-0">
        <div className="h-9 w-32 animate-pulse rounded-lg bg-white/10" />
        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="space-y-2">
            <div className="h-8 w-full animate-pulse rounded bg-white/10" />
            <div className="h-8 w-4/5 animate-pulse rounded bg-white/10" />
          </div>
        </div>
        <div className="h-3 w-40 animate-pulse rounded bg-white/10" />
      </div>

      {/* Right panel skeleton */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm space-y-5">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />
          <div className="space-y-2">
            <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="space-y-3">
            <div className="h-9 w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="h-9 w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
