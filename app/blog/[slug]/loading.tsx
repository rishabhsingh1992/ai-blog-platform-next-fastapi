export default function PostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="h-4 w-48 rounded bg-surface" />

      <header className="mb-10 mt-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-5 w-16 rounded-full bg-surface" />
              <div className="h-4 w-32 rounded bg-surface" />
            </div>
            <div className="h-10 w-full rounded-lg bg-surface" />
          </div>
          <div className="h-9 w-9 rounded-full bg-surface" />
        </div>
        <div className="mt-4 h-6 w-full rounded-lg bg-surface" />
      </header>

      {/* Share section skeleton */}
      <div className="mb-12 h-16 w-full rounded-xl border border-border/50 bg-surface/50" />

      {/* Body content skeleton */}
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full rounded bg-surface" />
            <div className="h-4 w-[95%] rounded bg-surface" />
            <div className="h-4 w-[90%] rounded bg-surface" />
          </div>
        ))}
      </div>
    </div>
  );
}
