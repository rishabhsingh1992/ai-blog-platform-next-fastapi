export default function PostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 flex items-center gap-3">
        <div className="h-5 w-16 rounded-full bg-surface" />
        <div className="h-4 w-24 rounded bg-surface" />
      </div>
      <div className="mb-2 h-7 w-3/4 rounded-lg bg-surface" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-surface" />
        <div className="h-4 w-2/3 rounded bg-surface" />
      </div>
    </div>
  );
}
