import type { Metadata } from "next";
import { getAllPosts } from "@/app/lib/posts";
import PostCard from "@/app/ui/post-card";

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
      <div className="space-y-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
