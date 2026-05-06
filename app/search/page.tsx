import { searchPosts } from "@/app/lib/posts";
import PostCard from "@/app/ui/post-card";
import Link from "next/link";
import EmptyState from "@/app/ui/empty-state";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const results = searchPosts(query);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12">
        <Link 
          href="/" 
          className="text-sm font-medium text-accent hover:underline mb-4 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>
        <p className="text-muted text-lg">
          {results.length} {results.length === 1 ? "result" : "results"} found
        </p>
      </div>

      {results.length > 0 ? (
        <ul className="space-y-10">
          {results.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No results found"
          message={`We couldn't find any articles matching "${query}". Try searching for something else or browse our latest posts.`}
          actionLabel="Clear search"
          actionHref="/search"
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>}
        />
      )}

    </div>
  );
}
