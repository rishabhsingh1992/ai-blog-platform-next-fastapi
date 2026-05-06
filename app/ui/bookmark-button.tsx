"use client";

import { useBookmarks } from "@/app/lib/bookmarks";
import { useState, useEffect } from "react";

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-accent" : "text-muted transition-colors group-hover:text-foreground"}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

export default function BookmarkButton({ slug }: { slug: string }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const active = isBookmarked(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(slug);
      }}
      className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-all hover:border-muted-foreground/30 hover:shadow-sm active:scale-90"
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
    >
      <BookmarkIcon filled={active} />
    </button>
  );
}
