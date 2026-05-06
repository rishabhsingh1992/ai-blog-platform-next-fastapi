import PostSkeleton from "../ui/post-skeleton";

export default function BookmarksLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 flex items-end justify-between animate-pulse">
        <div className="space-y-2">
          <div className="h-9 w-40 rounded-lg bg-surface" />
          <div className="h-5 w-56 rounded-lg bg-surface" />
        </div>
        <div className="h-7 w-20 rounded-full bg-surface" />
      </div>
      <div className="space-y-12">
        {[...Array(2)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
