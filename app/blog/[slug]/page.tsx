import { notFound } from "next/navigation";
import { getPost, estimateReadTime } from "@/app/lib/posts";
import BookmarkButton from "@/app/ui/bookmark-button";
import ShareButtons from "@/app/ui/share-buttons";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import JsonLd from "@/app/ui/json-ld";

// ---------------------------------------------------------------------------
// Small, focused components
// ---------------------------------------------------------------------------

function PostTag({ tag }: { tag: string }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-muted">
      {tag}
    </span>
  );
}

function PostMeta({ date, readTime }: { date: string; readTime: number }) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center gap-3 text-sm text-muted">
      <time dateTime={date}>{formatted}</time>
      <span aria-hidden="true">·</span>
      <span>{readTime} min read</span>
    </div>
  );
}

function PostBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-6 text-[1.0625rem] leading-8 text-foreground/90">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  return { title: post?.title ?? "Post Not Found" };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const readTime = estimateReadTime(post.content);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd post={post} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/blog" },
          { label: post.title },
        ]}
      />

      <header className="mb-10 mt-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <PostTag tag={post.tag} />
              <PostMeta date={post.date} readTime={readTime} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{post.title}</h1>
          </div>
          <div className="shrink-0 pt-2">
            <BookmarkButton slug={post.slug} />
          </div>
        </div>
        <p className="mt-4 text-xl leading-relaxed text-muted font-medium italic">
          {post.excerpt}
        </p>
      </header>

      <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-border/50 py-6">
        <ShareButtons title={post.title} url="" />
        <div className="text-sm text-muted font-medium flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />
          Enjoying this? Save it for later
        </div>
      </div>

      <PostBody paragraphs={post.content} />
      
      <div className="mt-16 pt-12 border-t border-border">
        <h3 className="text-lg font-bold mb-4">Continue Reading</h3>
        <p className="text-muted mb-6">Discover more insights and tutorials on our blog.</p>
        <a 
          href="/blog" 
          className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
        >
          View all articles
        </a>
      </div>
    </div>
  );
}
