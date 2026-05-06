import PostSkeleton from "../ui/post-skeleton";

export default function PopularLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 space-y-2 animate-pulse">
        <div className="h-9 w-32 rounded-lg bg-surface" />
        <div className="h-5 w-64 rounded-lg bg-surface" />
      </div>
      <div className="space-y-10">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
