import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default function BookmarksPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        <p className="mt-2 text-muted">Posts you&apos;ve saved for later.</p>
      </div>
      <div className="rounded-lg border border-border px-8 py-12 text-center">
        <p className="font-medium">No bookmarks yet</p>
        <p className="mt-2 text-sm text-muted">
          Save posts to read later and they&apos;ll appear here.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Browse posts
        </Link>
      </div>
    </div>
  );
}
