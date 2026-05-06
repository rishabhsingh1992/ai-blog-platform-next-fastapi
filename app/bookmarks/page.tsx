"use client";

import { useBookmarks } from "@/app/lib/bookmarks";
import { getAllPosts } from "@/app/lib/posts";
import PostCard from "@/app/ui/post-card";
import Link from "next/link";
import { useState, useEffect } from "react";
import EmptyState from "@/app/ui/empty-state";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const allPosts = getAllPosts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-10">Bookmarks</h1>
        <div className="h-64 w-full animate-pulse bg-surface rounded-3xl" />
      </div>
    );
  }

  const bookmarkedPosts = allPosts.filter((post) => bookmarks.includes(post.slug));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Bookmarks</h1>
          <p className="mt-2 text-muted">Posts you&apos;ve saved for later.</p>
        </div>
        <span className="text-sm font-medium text-muted bg-surface px-3 py-1 rounded-full border border-border">
          {bookmarkedPosts.length} saved
        </span>
      </div>

      {bookmarkedPosts.length > 0 ? (
        <ul className="space-y-12">
          {bookmarkedPosts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No bookmarks yet"
          message="Save posts to read later and they'll appear here. Start exploring our latest articles to find something interesting."
          actionLabel="Browse articles"
          actionHref="/"
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>}
        />
      )}

    </div>
  );
}
