import Link from "next/link";
import type { Post } from "@/app/lib/posts";
import BookmarkButton from "./bookmark-button";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-muted">
      {tag}
    </span>
  );
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <TagBadge tag={post.tag} />
            <time dateTime={post.date} className="text-sm text-muted">
              {formatDate(post.date)}
            </time>
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors hover:text-accent"
            >
              {post.title}
            </Link>
          </h3>
          <p className="leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>
        </div>
        <div className="shrink-0 pt-1">
          <BookmarkButton slug={post.slug} />
        </div>
      </div>
    </article>
  );
}
