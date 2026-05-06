import type { Metadata } from "next";
import { getAllPosts } from "@/app/lib/posts";
import PostCard from "@/app/ui/post-card";
import EmptyState from "@/app/ui/empty-state";

export const metadata: Metadata = {
  title: "Popular",
};

export default function PopularPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Popular</h1>
        <p className="mt-2 text-muted">The most-read posts on the blog.</p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No trending posts yet"
          message="We couldn't find any popular articles at the moment. Check back soon for the latest insights."
          actionLabel="View all articles"
          actionHref="/"
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>}
        />
      )}
    </div>
  );
}

