import PostSkeleton from "./ui/post-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16 space-y-4">
        <div className="h-10 w-2/3 animate-pulse rounded-lg bg-surface" />
        <div className="h-6 w-full animate-pulse rounded-lg bg-surface" />
      </section>

      <section>
        <div className="mb-8 h-4 w-24 animate-pulse rounded bg-surface" />
        <div className="space-y-10">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
