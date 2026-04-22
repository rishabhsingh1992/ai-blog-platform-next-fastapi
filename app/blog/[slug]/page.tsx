import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, estimateReadTime } from "@/app/lib/posts";

// ---------------------------------------------------------------------------
// Small, focused components
// ---------------------------------------------------------------------------

function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
    >
      <span aria-hidden="true">←</span> Back to posts
    </Link>
  );
}

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
    <div className="space-y-6 text-[1.0625rem] leading-8">
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
      <BackLink />

      <header className="mb-10 mt-8">
        <div className="mb-4 flex items-center gap-3">
          <PostTag tag={post.tag} />
          <PostMeta date={post.date} readTime={readTime} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
      </header>

      <hr className="mb-10 border-border" />

      <PostBody paragraphs={post.content} />
    </div>
  );
}
