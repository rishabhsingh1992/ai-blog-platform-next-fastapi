import PostSkeleton from "../ui/post-skeleton";

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12 space-y-4 animate-pulse">
        <div className="h-4 w-24 rounded bg-surface" />
        <div className="h-10 w-64 rounded-lg bg-surface" />
        <div className="h-5 w-32 rounded bg-surface" />
      </div>
      <div className="space-y-10">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
